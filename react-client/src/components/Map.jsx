import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { GOOGLE_API_KEY } from '../../../server/config.js';
import $ from 'jquery';

const Map = ({inputText, updateResults}) => {

  let map;
  let marker;
  let geocoder;
  let infoWindow;
  let inputLocation;
  let latitude;
  let longitude;
  let calcLocation;
  let currentLocation;

  // const [location, setLocation] = useState(inputLocation);
  useEffect(()=>getCurrentLocation(), [navigator.geolocation])
  // get current location
  const getCurrentLocation = () => {
    console.log('click')
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
      console.log(currentLocation);
    }
   else {
      alert('Please enable location services')
    }
  }

  // call to use Google Maps API
  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  // set options to center custom map around given location
  const mapOptions = {
    mapId: 'a121546c2907cd53',
    center: currentLocation ? currentLocation : inputLocation,
    zoom: 14
  };


  // adds markers to the map
  const markPlaces = (places, map) => {
    const placesList = document.getElementById("places");

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: '/images/icons8-toilet-52 (dark).png',
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

  // initiates the map using options and functions above
  const initMap = (currentLocation, address) => {
    loader.load()
      .then(() => {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        marker = new google.maps.Marker({
          map,
        })

        // add event listener to add marker where map is clicked
        google.maps.event.addListener(map, 'click', (event) => {
          addMarker(event.latLng);
        });

        const addMarker = (location) => {
          let marker = new google.maps.Marker({
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
        }



        // // search based on current position
        // const locationButton = document.createElement("button");
        // locationButton.textContent = "Search Current Location";
        // locationButton.classList.add("custom-map-control-button");
        // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        // locationButton.addEventListener("click", () => getCurrentLocation());

        if (!currentLocation) {
          // converts address to lat/lng required for nearby places search
          geocoder = new google.maps.Geocoder();
          geocoder
          .geocode({address: address})
          .then((result) => {
            console.log('geocoding result:', result)
            const { results } = result;
            inputLocation = results[0].geometry.location;
            latitude = inputLocation.lat();
            longitude = inputLocation.lng();
            calcLocation = { lat: latitude, lng: longitude}
            map.setCenter(inputLocation);
            marker.setPosition(inputLocation);
            marker.setMap(map);
            return calcLocation;
          })
          .then((response) => {
            console.log(response)
            searchMapByText(response)
          })
          .catch((e) => {
            alert("Geocode was not successful for the following reason: " + e);
          });
        } else {
          console.log('currentLocation', currentLocation)
          map.setCenter(currentLocation);
          marker.setPosition(currentLocation);
          marker.setMap(map);
          searchMapByText(currentLocation)
        }
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
        {location: response, radius: 1000, keyword: "restroom toilet"},
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
          markPlaces(results, map);
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
          markPlaces(results, map);
          console.log('here are the results', results);
          updateResults(results);
        }
      )
    })
  };

  if (inputText === '') {
    inputText = 'San Francisco'
  }

  useEffect(() => initMap(currentLocation, inputText), [navigator.geolocation]);

  return (
    <>
    <div id="container">
      <div id="map"></div>
    </div>
    </>
  )
}


export default Map;