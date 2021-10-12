import React from 'react';

const Map = () => {
  let map;

  const initMap = () => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });


    return (
      <div>
        {initMap()}
      </div>
    )

  }
}

export default Map;