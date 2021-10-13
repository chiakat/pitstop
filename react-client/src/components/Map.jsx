import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_API_KEY } from '../../../server/config.js';
import $ from 'jquery';


const Map = ({inputText}) => {

  let map;
  let marker;
  let geocoder;
  let infoWindow;

  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  const mapOptions = {
    center: {
      lat: 37.7749,
      lng: 122.4194
    },
    zoom: 16
  };


  const initMap = (address) => {
    loader.load()
      .then(() => {
        console.log('initMap was called', address)
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        geocoder = new google.maps.Geocoder();

        geocode({ address: address })

        marker = new google.maps.Marker({
          map,
          // icon: 'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-toilet-interior-furniture-those-icons-fill-those-icons-1.png'
        });

        infoWindow = new google.maps.InfoWindow({
          content: `<h1>${address}</h1>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        })

      })
      .catch(e => {
        console.log(e);
        alert('Failed to load. Please try again.')
      })
  };


  const geocode = (request) => {
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }

  initMap(inputText)

  return (
    <div id="map">Where is the map</div>
  )
}


export default Map;