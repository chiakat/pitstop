import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_API_KEY } from '../../../server/config.js';


const Map = ({inputText}) => {
  console.log(inputText)
  // convert location to latitude/longitude
  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&v=weekly`;
  //   script.async = true;

  //   document.body.appendChild(script);

  //   // return () => {
  //   //   document.body.removeChild(script);
  //   // }
  // }, []);


  let map;
  let marker;
  let geocoder;
  let responseDiv;
  let response;

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
    zoom: 4
  };


  const initMap = (address) => {
    loader.load()
      .then(() => {
        console.log('initMap was called', address)
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        geocoder = new google.maps.Geocoder();

        geocode({ address: address })

        const inputText = document.createElement("input");

        inputText.type = "text";
        inputText.placeholder = "Enter a location";

        const submitButton = document.createElement("input");

        submitButton.type = "button";
        submitButton.value = "Geocode";
        submitButton.classList.add("button", "button-primary");

        const clearButton = document.createElement("input");

        clearButton.type = "button";
        clearButton.value = "Clear";
        clearButton.classList.add("button", "button-secondary");
        response = document.createElement("pre");
        response.id = "response";
        response.innerText = "";
        responseDiv = document.createElement("div");
        responseDiv.id = "response-container";
        responseDiv.appendChild(response);

        const instructionsElement = document.createElement("p");

        instructionsElement.id = "instructions";
        instructionsElement.innerHTML =
          "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
        marker = new google.maps.Marker({
          map,
        });
        map.addListener("click", (e) => {
          geocode({ location: e.latLng });
        });
        submitButton.addEventListener("click", () =>
          geocode({ address: inputText.value })
        );
        clearButton.addEventListener("click", () => {
          clear();
        });
        clear();
      })
      .catch(e => {
        console.log(e);
        alert('Failed to load. Please try again.')
      })
  };

  const clear = () => {
    marker.setMap(null);
    responseDiv.style.display = "none";
  }

  const geocode = (request) => {
    console.log(request)
    // clear();
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        responseDiv.style.display = "block";
        response.innerText = JSON.stringify(result, null, 2);
        return results;
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