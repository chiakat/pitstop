import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { GOOGLE_API_KEY } from '../../../server/config.js';
import $ from 'jquery';

const Map = ({inputText, updateResults, toilets, water, changeView}) => {

  let map;
  let marker;
  let geocoder;
  let infoWindow;
  // let inputLocation;
  // let latitude;
  // let longitude;
  let calcLocation;
  let currentLocation;

  // get corresponding icon and keywords for toilet and water
  let iconURL;
  let keywords;
  if (water) {
    iconURL ='/images/icons8-water-64.png';
    keywords ='drinking water';
  } else {
    iconURL ='/images/icons8-toilet-52 (dark).png';
    keywords ='restroom toilet';
  }

  const [mapView, setMapView] = useState('readOnly')
  const [newLocation, setNewLocation] = useState('')
  const [address, saveAddress] = useState('')

  // call to use Google Maps API
  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  // useEffect((inputText)=>findLocation(inputText), [])
  // useEffect(()=>getCurrentLocation(), [navigator.geolocation])
  useEffect((inputText)=>initMap(inputText), [])





  // get current location
  const getCurrentLocation = () => {
    console.log('finding current location')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('position', position)
          currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }
      );
      return currentLocation;
    }
   else {
      alert('Please enable location services')
    }
  }

  // set options to center custom map around given location
  const mapOptions = {
    mapId: 'a121546c2907cd53',
    center: calcLocation,
    zoom: 14
  };


  // adds markers to the map
  const renderMarkers = (places, map) => {
    const placesList = document.getElementById("places");

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: iconURL,
          size: new google.maps.Size(52, 52),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30),
        };

        const renderRatings = (place) => {
          if (place.user_ratings_total > 0) {
              return `⭐ ${place.rating} &#40;${place.user_ratings_total}&#41;`
          }
          return '';
        }

        const contentString =
          `<h4>${place.name}</h4>
          <div>Accessible  Open Now  Free</div>
          <div>${place.formatted_address}</div>
          <div>Status: ${place.business_status}</div>
          <div>${renderRatings(place)}</div>`

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        const marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
        const li = document.createElement("li");
      }
    }
  }

  // finds the address of the location that was clicked and change to add Form view
  const addDetail = (location) => {
    loader.load().then((google) => {
      const geocoder = new google.maps.Geocoder();
      geocoder
      .geocode(location)
      .then((address) =>
      changeView('add'))
    })
  }

  // initiates the map using options and functions above
  const initMap = async (inputText) => {
    // converts inputText to a valid lat/lng location to render map
    loader.load()
      .then(() => {
        let result;
        if (!inputText) {
          inputText === 'San Francisco'
        } else if (inputText === 'Use Current Location') {
          result = getCurrentLocation();
        } else {
          // converts address to lat/lng required for nearby places search
          geocoder = new google.maps.Geocoder();
          geocoder
          .geocode({address: inputText})
          .then((result) => {
            console.log('geocoding result:', result)
            const { results } = result;
            const inputLocation = results[0].geometry.location;
            const latitude = inputLocation.lat();
            const longitude = inputLocation.lng();
            result = { lat: latitude, lng: longitude}
            // map.setCenter(inputLocation);
            // marker.setPosition(inputLocation);
            // marker.setMap(map);
            console.log('result', result);
          })
          .catch((e) => {
            alert("Geocode was not successful for the following reason: " + e);
          });
        }
        console.log('result', result);
        return result;
      })
      // .then(() => {
      //   const result = findLocation(inputText);
      //   console.log(result)
      //   return result
      // })
      .then((calcLocation) => {
        console.log('attempt map setup', calcLocation)
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        marker = new google.maps.Marker({
          map,
        })

        // center map to desired location
        map.setCenter(calcLocation);
        marker.setPosition(calcLocation);
        marker.setMap(map);

        // search for toilet/water near location
        searchMapByText(calcLocation)

        // add event listener to add marker where map is clicked
        google.maps.event.addListener(map, 'click', (event) => {
          addMarker(event.latLng);
        });

        const addMarker = (location) => {
          setNewLocation(location);
          console.log('location of new marker', location)
          let newMarker = new google.maps.Marker({
            position: location,
            map,
            icon: {
              path:faMapMarkerAlt.icon[4],
              fillColor: "#91DB22",
              fillOpacity: 1,
              anchor: new google.maps.Point(
                faMapMarkerAlt.icon[0] / 2, // width
                faMapMarkerAlt.icon[1] // height
              ),
              strokeWeight: 1,
              strokeColor: "#ffffff",
              scale: 0.075,
            },
            title: "FontAwesome SVG Marker",
          });

          const infowindow = new google.maps.InfoWindow({
            content: `<div onClick=${(location) => addDetail(location)}>
            Click here to add more detail</div>
            <p>Coordinates: ${marker.getPosition()}</p>`
          });

          infowindow.open({
            anchor: newMarker,
            map,
            shouldFocus: true,
          });

        }



        // // search based on current position
        // const locationButton = document.createElement("button");
        // locationButton.textContent = "Search Current Location";
        // locationButton.classList.add("custom-map-control-button");
        // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        // locationButton.addEventListener("click", () => getCurrentLocation());

        // if (inputText !== 'Use Current Location') {
        //   // converts address to lat/lng required for nearby places search
        //   geocoder = new google.maps.Geocoder();
        //   geocoder
        //   .geocode({address: address})
        //   .then((result) => {
        //     console.log('geocoding result:', result)
        //     const { results } = result;
        //     inputLocation = results[0].geometry.location;
        //     latitude = inputLocation.lat();
        //     longitude = inputLocation.lng();
        //     calcLocation = { lat: latitude, lng: longitude}
        //     map.setCenter(inputLocation);
        //     marker.setPosition(inputLocation);
        //     marker.setMap(map);
        //     return calcLocation;
        //   })
        //   .then((response) => {
        //     console.log(response)
        //     searchMapByText(response)
        //   })
        //   .catch((e) => {
        //     alert("Geocode was not successful for the following reason: " + e);
        //   });
        // } else {
        //   console.log('currentLocation', currentLocation)
        //   map.setCenter(currentLocation);
        //   marker.setPosition(currentLocation);
        //   marker.setMap(map);
        //   searchMapByText(currentLocation)
        // }
      })
      .catch(e => {
        console.log(e);
        alert('Failed to load. Please try again.')
      })
  }

  // Perform a nearby search.
  const searchNearby = (location) => {
    loader.load().then((google) => {
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {location: response, radius: 1000, keyword: keywords},
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
          renderMarkers(results, map);
          console.log('here are the results', results);
          updateResults(results);
        }
      )
    })
  };

  // Perform a text search.
  const searchMapByText = (location) => {
    loader.load().then((google) => {
      const service = new google.maps.places.PlacesService(map);
      service.textSearch(
        {location: location, radius: 500, query: "public restroom"},
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
          renderMarkers(results, map);
          console.log('here are the results', results);
          updateResults(results);
        }
      )
    })
  };



  return (
    <>
    <div id="container">
      <div id="map"></div>
    </div>
    </>
  )
}


export default Map;