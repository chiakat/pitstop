import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_API_KEY } from '../../../server/config.js';
import $ from 'jquery';


const Map = ({inputText, updateResults, currentLocation}) => {

  let map;
  let marker;
  let geocoder;
  let infoWindow;
  let inputLocation;
  let latitude;
  let longitude;
  let calcLocation;

  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  // const sanFrancisco = {lat: 37.7749, lng: 122.4194};
  const mapOptions = {
    mapId: 'a121546c2907cd53',
    center: currentLocation ? currentLocation : inputLocation,
    zoom: 16
  };



  // converts address input to latitude and longitude and centers map
  const geocode = (request) => {
    geocoder
      .geocode(request)
      .then((result) => {
        console.log(result)
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
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }


  // // adds more places to the map
  const addPlaces = (places, map) => {
    const placesList = document.getElementById("places");

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
         // url: place.icon,
          url: '/images/icons8-toilet-52 (dark).png',
          size: new google.maps.Size(52, 52),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30),
        };

        new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });

        const li = document.createElement("li");

      }
    }
  }

  const initMap = (currentLocation, address) => {
    loader.load()
      .then(() => {
        console.log('initMap was called', address)
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        marker = new google.maps.Marker({
          map,
        });

        geocoder = new google.maps.Geocoder();
        geocoder
          .geocode({address: address} )
          .then((result) => {
            console.log(result)
            const { results } = result;
            inputLocation = results[0].geometry.location;
            latitude = inputLocation.lat();
            longitude = inputLocation.lng();
            console.log(latitude, longitude)
            calcLocation = { lat: latitude, lng: longitude}
            map.setCenter(inputLocation);
            marker.setPosition(inputLocation);
            marker.setMap(map);
            if (currentLocation === '') {
              return calcLocation;
            }
            return currentLocation;
          })
          .then((response) => {
            console.log(response)
            // Create the places service.
            const service = new google.maps.places.PlacesService(map);

            // // Perform a text search.
            // service.textSearch(
            //   {location: response, radius: 100, query: "public restroom"},
            //   (results, status, pagination) => {
            //     if (status !== "OK" || !results) return;
            //     addPlaces(results, map);
            //     console.log('here are the results', results);
            //     updateResults(results);

            // Perform a nearby search.
            service.nearbySearch(
              {location: response, radius: 1000, keyword: "restroom toilet"},
              (results, status, pagination) => {
                if (status !== "OK" || !results) return;
                addPlaces(results, map);
                console.log('here are the results', results);
                updateResults(results);
              }

            );
          })
        })

      .catch(e => {
        console.log(e);
        alert('Failed to load. Please try again.')
      })
  };

  useEffect(() => initMap(currentLocation, inputText), []);

  return (
    <>
    <div id="container">
      <div id="map"></div>
    </div>
    </>
  )
}


export default Map;