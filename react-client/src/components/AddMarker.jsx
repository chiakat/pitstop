import React from 'react';
import PropTypes from 'prop-types';

const AddMarker = () =>

//   // You can use a LatLng literal in place of a google.maps.LatLng object when
// // creating the Marker object. Once the Marker object is instantiated, its
// // position will be available as a google.maps.LatLng object. In this case,
// // we retrieve the marker's position using the
// // google.maps.LatLng.getPosition() method.
// const infowindow = new google.maps.InfoWindow({
//   content: "<p>Marker Location:" + marker.getPosition() + "</p>",
// });

// google.maps.event.addListener(marker, "click", () => {
//   infowindow.open(map, marker);
// });

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
  (
    <div>Add Marker</div>
  );
export default AddMarker;
