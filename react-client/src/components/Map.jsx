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

  // converts address input to latitide and longitude and centers map
  const geocode = (request) => {
    geocoder
      .geocode(request)
      .then((result) => {
        console.log(results)
        const { results } = result;
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }


  // adds more places to the map
  const addPlaces = (places, map) => {
    const placesList = document.getElementById("places");

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });

        const li = document.createElement("li");

        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

  const initMap = (address) => {
    loader.load()
      .then(() => {
        console.log('initMap was called', address)
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        geocoder = new google.maps.Geocoder();
        geocode({ address: address })

          // Create the places service.
        const service = new google.maps.places.PlacesService(map);
        let getNextPage;
        const moreButton = document.getElementById("more");

        moreButton.onclick = function () {
          moreButton.disabled = true;
          if (getNextPage) {
            getNextPage();
          }
        };

        // Perform a nearby search.
        service.nearbySearch(
          { location: address, radius: 500, type: "public toilet" },
          (results, status, pagination) => {
            if (status !== "OK" || !results) return;

            addPlaces(results, map);
            moreButton.disabled = !pagination || !pagination.hasNextPage;
            if (pagination && pagination.hasNextPage) {
              getNextPage = () => {
                // Note: nextPage will call the same handler function as the initial call
                pagination.nextPage();
              };
            }
          }
        );



        // ADD MARKERS FOR THE MAP============================
        // // Array of markers
        // let markers = [
        //   {
        //     coords: {lat: 33, lng: -117},
        //     // iconImage: 'react-client/dist/images/icons8-toilet-26.png',
        //     content: `<h4>Test</h4>`
        //   },
        //   {
        //     coords: {lat: 34, lng: -118},
        //     // iconImage: 'react-client/dist/images/icons8-toilet-26.png',
        //     content: `<h4>Test</h4>`
        //   }
        // ];

        // // Add Marker Function
        // const addMarker = (newMarker) => {
        //   marker = new google.maps.Marker({
        //     position: newMarker.coords,
        //     map: map,
        //     // icon: newMarker.iconImage,
        //   });
        //   // check for custom icon
        //   if(newMarker.iconImage) {
        //     marker.setIcon(newMarker.iconImage)
        //   }
        //   // check content
        //   if(newMarker.content) {
        //     infoWindow = new google.maps.InfoWindow({
        //       content: newMarker.content
        //     });
        //   }
        // }

        // // Loop through markers
        // markers.forEach(marker => {
        //   addMarker(marker);
        // })

        // marker = new google.maps.Marker({
        //   map,
        //   // icon: 'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-toilet-interior-furniture-those-icons-fill-those-icons-1.png'
        // });

        // infoWindow = new google.maps.InfoWindow({
        //   // replace this content with info about each bathroom
        //   content: `<h1>${address}</h1>`
        // });

        // marker.addListener('click', () => {
        //   infoWindow.open(map, marker);
        // })

        // // Add new marker
        // map.addListener(map, 'click', (e) => {
        //   addMarker({coords: e.latLng})
        // })

      })
      .catch(e => {
        console.log(e);
        alert('Failed to load. Please try again.')
      })
  };

  initMap(inputText)



  return (
    <>
    <div id="container">
      <div id="map"></div>
      <div id="sidebar">
        <h2>Results</h2>
        <ul id="places"></ul>
        <button id="more">Load more results</button>
      </div>
    </div>
    </>
  )
}


export default Map;