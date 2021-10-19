/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* global google */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { GOOGLE_API_KEY } from '../../../server/config.js';

const Directions = ({ currentLocation, destination }) => {
  // call to use Google Maps API
  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: 'weekly',
    libraries: ['places'],
  });

  // set options to center custom map around given location
  const mapOptions = {
    mapId: 'a121546c2907cd53',
    center: currentLocation
    zoom: 14,
    mapTypeControl: false,
  };

  // initiates the map using options and functions above
  const initMap = (address) => {
    loader.load()
      .then(() => {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const mapOptions = {
          zoom: 7,
          center: currentLocation,
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById('directionsPanel'));
      });

    const calcRoute = () => {
      const start = document.getElementById('start').value;
      const end = document.getElementById('end').value;
      const request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING',
      };
      directionsService.route(request, (response, status) => {
        if (status == 'OK') {
          directionsRenderer.setDirections(response);
        }
      });
    };
  };
};

export default Directions;
