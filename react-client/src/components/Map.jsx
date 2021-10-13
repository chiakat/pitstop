import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
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

  // const [searchResults, setResults] = useState([]);

  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  // const sanFrancisco = {lat: 37.7749, lng: 122.4194};
  const mapOptions = {
    mapId: 'a121546c2907cd53',
    center: inputLocation,
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

  // let getNextPage;
  // const moreButton = document.getElementById("more");

  // moreButton.onclick = function () {
  //   moreButton.disabled = true;
  //   if (getNextPage) {
  //     getNextPage();
  //   }
  // };

  // // adds more places to the map
  const addPlaces = (places, map) => {
    const placesList = document.getElementById("places");

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
         // url: place.icon,
          url: '/images/icons8-toilet-52.png',
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });

        const li = document.createElement("li");

        // li.textContent = place.name;
        // placesList.appendChild(li);
        // li.addEventListener("click", () => {
        //   map.setCenter(place.geometry.location);
        // });
      }
    }
  }

  const initMap = (address) => {
    loader.load()
      .then(() => {
        console.log('initMap was called', address)
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        marker = new google.maps.Marker({
          map,
          // icon: 'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-toilet-interior-furniture-those-icons-fill-those-icons-1.png'
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
            return calcLocation;
          })
          .then((response) => {
            console.log(response)
            // Create the places service.
            const service = new google.maps.places.PlacesService(map);

            // // Perform a text search.
            // service.TextSearchRequest(
            //   {location: response, radius: 500, query: "restroom"},
            //   (results, status, pagination) => {
            //     if (status !== "OK" || !results) return;
            //     addPlaces(results, map);
            //     console.log('here are the results', results);
            //     updateResults(results);

            // Perform a nearby search.
            service.nearbySearch(
              {location: response, radius: 500, type: "park"},
              (results, status, pagination) => {
                if (status !== "OK" || !results) return;
                addPlaces(results, map);
                console.log('here are the results', results);
                updateResults(results);

                // moreButton.disabled = !pagination || !pagination.hasNextPage;
                // if (pagination && pagination.hasNextPage) {
                //   getNextPage = () => {
                //     // Note: nextPage will call the same handler function as the initial call
                //     pagination.nextPage();
                //   };
                // }
              }
            );
          })
        })

      .catch(e => {
        console.log(e);
        alert('Failed to load. Please try again.')
      })
  };

  useEffect(() => initMap(inputText), []);

  return (
    <>
    <div id="container">
      <div id="map"></div>
    </div>
    </>
  )
}


export default Map;