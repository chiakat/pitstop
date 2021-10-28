/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* global google */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDirections } from '@fortawesome/free-solid-svg-icons';

const Map = ({
  inputText, updateResults, water, changeView, getNewLocation, getNewLocationInfo, currentLocation,
}) => {
  let map;
  let marker;
  let geocoder;
  // let infowindow;
  let inputLocation;
  let originLat;
  let originLng;
  let calcLatLng;
  let markerCount = 0;

  // my current location: (33.889390, -117.964080)
  // use SF as default map view if no location entered
  // if (inputText === '') {
  //   inputText = 'San Francisco';
  // }

  // if (newLocation !== '') {
  //   currentLocation = newLocation;
  // }

  const [mapView, setMapView] = useState('readOnly');
  const [newLocation, setNewLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // call to use Google Maps API
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: 'weekly',
    libraries: ['places'],
  });

  // set options to center custom map around given location
  const mapOptions = {
    mapId: 'a121546c2907cd53',
    center: currentLocation || inputLocation,
    zoom: 14,
    mapTypeControl: false,
  };

  // get corresponding icon and keywords for toilet and water
  let iconURL;
  let keywords;
  if (water) {
    iconURL = '/images/icons8-water-64.png';
    keywords = 'drinking water';
  } else {
    iconURL = '/images/icons8-toilet-52 (dark).png';
    keywords = 'restroom toilet';
  }

  let markers = [];
  // adds markers to the map
  const renderMarkers = (places) => {
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: iconURL,
          size: new google.maps.Size(52, 52),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30),
        };
        const placeLat = place.geometry.location.lat();
        const placeLng = place.geometry.location.lng();
        let placeDistance = '';
        let placeDuration = '';
        // get distance between the current location and result marker
        const distService = new google.maps.DistanceMatrixService();
        // console.log('location submitted to distService', inputText);
        console.log('place geometry location lat lng:', place.geometry.location.lat(), place.geometry.location.lng());

        distService.getDistanceMatrix(
          {
            origins: [inputText === 'Use Current Location' ? currentLocation : inputText],
            destinations: [place.geometry.location],
            travelMode: 'WALKING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: true,
            avoidTolls: true,
          }, (response, status) => {
            if (status !== 'OK' || !response) return;
            // console.log('here are the responses', response);
            // console.log('distance', response.rows[0].elements[0].distance.text);
            // console.log('duration', response.rows[0].elements[0].duration.text);
            placeDistance = response.rows[0].elements[0].distance.text;
            placeDuration = response.rows[0].elements[0].duration.text;

            const renderRatings = () => {
              if (place.user_ratings_total > 0) {
                return `⭐ ${place.rating} &#40;${place.user_ratings_total}&#41;`;
              }
              return '';
            };

            // const photo = place.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` : '';

            const contentString = `<div class="info">
              <h4>${place.name}</h4>
              <div class="info-labels">
                <span>Accessible</span>
                <span>Open Now</span>
                <span>Free</span>
              </div>
              <span class="dist">${placeDistance}</span>
              <span class="duration">${placeDuration}</span>
              <div>${place.formatted_address}</div>
              <div>Status: ${place.business_status}</div>
              <div>${renderRatings(place)}</div>
              <a href="https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${placeLat},${placeLng}" target="_blank">GO!</a>
              </div>`;

            const infowindow = new google.maps.InfoWindow({
              content: contentString,
            });

            const placeMarker = new google.maps.Marker({
              map,
              icon: image,
              title: place.name,
              position: place.geometry.location,
            });

            placeMarker.addListener('click', () => {
              infowindow.open({
                anchor: placeMarker,
                map,
                shouldFocus: false,
              });
            });

            markers.push(placeMarker);
          },
        );
      }
    }
  };

  const clearMarkers = () => {
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].setMap(null);
    }
    markers = [];
  };

  // Perform a text search.
  const searchMapByText = (location) => {
    loader.load().then((google) => {
      const service = new google.maps.places.PlacesService(map);
      service.textSearch(
        { location, radius: 100, query: 'public restroom' },
        // alt search: restroom|safeway|target|library|toilet
        (results, status, pagination) => {
          if (status !== 'OK' || !results) return;
          renderMarkers(results, map);
          // console.log('here are the results', results);
          updateResults(results);
        },
      );
    });
  };

  // // Perform a nearby search.
  // const searchNearby = (location) => {
  //   loader.load().then((google) => {
  //     const service = new google.maps.places.PlacesService(map);
  //     service.nearbySearch(
  //       { location, radius: 1000, keyword: keywords },
  //       (results, status, pagination) => {
  //         if (status !== 'OK' || !results) return;
  //         renderMarkers(results, map);
  //         // console.log('here are the results', results);
  //         updateResults(results);
  //       },
  //     );
  //   });
  // };

  // finds the address of the location that was clicked and change to add Form view
  const addDetail = () => {
    // gets details about the new location (i.e. address, ratings) from google
    // converts address to lat/lng required for nearby places search
    console.log('newLocation', newLocation);
    changeView('add');
  };

  const getMoveData = () => {
    loader.load()
      .then(() => {
        clearMarkers();
        searchMapByText(map.getCenter());
      });
  };

  // Primary Function: initiates the map using options and functions above ---------------------//
  const initMap = (address) => {
    if (inputText === 'Use Current Location' && currentLocation === '') {
      return;
    }
    loader.load()
      .then(() => {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        marker = new google.maps.Marker({
          map,
          draggable: mapView === 'readOnly',
          animation: mapView === 'readOnly' ? google.maps.Animation.DROP : 'none',
        });

        // provide new results if marker is moved
        google.maps.event.addListener(marker, 'dragend', () => {
          const lat = marker.getPosition().lat();
          const lng = marker.getPosition().lng();
          setNewLocation({ lat, lng });
          console.log(marker.getPosition());
          console.log('newLocation', newLocation);
        });

        // button to add more markers
        const addButton = document.createElement('button');
        if (mapView === 'readOnly') {
          addButton.textContent = 'Add a new spot';
          addButton.addEventListener('click', () => setMapView('edit'));
        } else if (mapView === 'edit') {
          addButton.textContent = 'Place a marker on the map, then click here to submit';
          addButton.addEventListener('click', () => addDetail());
        }
        addButton.classList.add('custom-map-control-button');
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(addButton);

        // add event listener to add marker where map is clicked
        google.maps.event.addListener(map, 'click', (event) => {
          console.log('clicked any time', mapView);
          if (mapView === 'edit' && markerCount === 0) {
            console.log('clicked with edit');
            addMarker(event.latLng);
          }
        });

        const addMarker = (location) => {
          const newMarker = new google.maps.Marker({
            position: location,
            map,
            draggable: true,
            icon: {
              path: faMapMarkerAlt.icon[4],
              fillColor: '#91DB22',
              fillOpacity: 1,
              anchor: new google.maps.Point(
                faMapMarkerAlt.icon[0] / 2, // width
                faMapMarkerAlt.icon[1], // height
              ),
              strokeWeight: 1,
              strokeColor: '#ffffff',
              scale: 0.075,
            },
            title: 'FontAwesome SVG Marker',
          });
          markerCount += 1;

          setNewLocation(marker.getPosition());
          geocoder = new google.maps.Geocoder();
          geocoder
            .geocode({ location: marker.getPosition() })
            .then((results) => {
              console.log('results from reverse geocode', results);
              getNewLocationInfo(results);
            })
            .catch((e) => {
              alert(`Geocode was not successful for the following reason: ${e}`);
            });

          const infowindow = new google.maps.InfoWindow({
            content: `<div>Click above to submit for ${newLocationInfo.formatted_address}</div>`,
          });

          infowindow.open({
            anchor: newMarker,
            map,
            shouldFocus: true,
          });
        };

        // // search based on location entered in search box
        // const searchBox = document.createElement("input");
        // searchBox.textContent = "Search Current Location";
        // searchBox.classList.add("custom-map-control-button");
        // map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchBox);
        // searchBox.addEventListener("change", (e) => setSearchLocation(e.target.value));
        // searchBox.addEventListener("submit", (e) => setSearchLocation(e.target.value));

        // // create search box to submit request
        // const searchButton = document.createElement("button");
        // searchButton.textContext = "Search";
        // searchButton.classList.add("custom-map-control-button");
        // map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchButton);
        // searchButton.addEventListener("click", () => renderResults(searchLocation));

        // // Create the search box and link it to the UI element.
        // const input = document.getElementById("pac-input");
        // const searchBox = new google.maps.places.SearchBox(input);

        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // // Bias the SearchBox results towards current map's viewport.
        // map.addListener("bounds_changed", () => {
        //   searchBox.setBounds(map.getBounds());
        // });

        const renderResults = (searchText) => {
          console.log('processing', searchText);
          if (currentLocation === '') {
            // converts address to lat/lng required for nearby places search
            geocoder = new google.maps.Geocoder();
            geocoder
              .geocode({ address: searchText })
              .then((result) => {
                console.log('geocoding result:', result);
                const { results } = result;
                inputLocation = results[0].geometry.location;
                originLat = inputLocation.lat();
                originLng = inputLocation.lng();
                calcLatLng = { lat: originLat, lng: originLng };
                map.setCenter(inputLocation);
                marker.setPosition(inputLocation);
                marker.setMap(map);
                return calcLatLng;
              })
              .then((currentLatLng) => {
                console.log('mycurrentlocation', currentLatLng);
                searchMapByText(currentLatLng);
              })
              .catch((e) => {
                alert(`Geocode was not successful for the following reason: ${e}`);
              });
          } else {
            console.log('currentLocation', currentLocation);
            map.setCenter(currentLocation);
            marker.setPosition(currentLocation);
            marker.setMap(map);
            searchMapByText(currentLocation);
          }
        };

        renderResults(address);
        // renders more search results as map is moved
        if (mapView === 'readOnly') {
          getMoveData();
          google.maps.event.addListener(map, 'dragend', getMoveData);
        }
      })
      .catch((e) => {
        console.log(e);
        alert('Failed to load. Please try again.');
      });
  };
  // End of initMap Wrapper -----------------------------------------------------------//

  // useEffect(() => getCurrentLocation(), [navigator.geolocation]);
  useEffect(() => initMap(inputText), [currentLocation, mapView]);
  useEffect(() => getNewLocation(newLocation), [newLocation]);

  return (
    <>
      <div className="map-container">
        <div id="map" />
      </div>
    </>
  );
};

Map.propTypes = {
  inputText: PropTypes.string,
  updateResults: PropTypes.func.isRequired,
  water: PropTypes.bool.isRequired,
  changeView: PropTypes.func.isRequired,
  getNewLocation: PropTypes.func.isRequired,
  getNewLocationInfo: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

Map.defaultProps = {
  inputText: 'San Francisco',
  currentLocation: '',
};

export default Map;
