import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

const List = ({ results, changeView, inputLocation, currentLocation }) => {
  const handleClick = (place) => {
    console.log('clicked', place);
    changeView('directions');
    // loader.load()
    //   .then(() => {
    //     const getDirections = (place) => {
    //       const directionsService = new google.maps.DirectionsService();
    //       const directionsRenderer = new google.maps.DirectionsRenderer();
    //       const mapOptions = {
    //         zoom: 7,
    //         center: currentLocation,
    //       };
    //       const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //       directionsRenderer.setMap(map);
    //       directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    //     };

    //     const calcRoute = () => {
    //       const request = {
    //         origin: [inputText],
    //         destination: [place.geometry.location],
    //         travelMode: 'WALKING',
    //       };
    //       directionsService.route(request, (response, status) => {
    //         if (status == 'OK') {
    //           directionsRenderer.setDirections(response);
    //         }
    //       });
    //     };
    //   });
  };

  const renderRatings = (place) => {
    if (place.user_ratings_total > 0) {
      return (
        <div>
          ⭐
          {' '}
          {place.rating}
          {' '}
          &#40;
          {place.user_ratings_total}
          &#41;
          {' '}
        </div>
      );
    }
    return null;
  };

  const renderLink = (place) => {
    const originLat = currentLocation.Lat;
    const originLng = currentLocation.Lng;
    console.log(place);
    // const placeLat = place.geometry.location.lat();
    // const placeLng = place.geometry.location.lng();
    // return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${placeLat},${placeLng}`;
  };

  return (
    <>
      <div className="filters">
        <button type="button" id="accessible">Accessible</button>
        <button type="button" id="open">Open Now</button>
        <button type="button" id="free">Free</button>
      </div>
      <div className="results">
        <ul id="places">
          {results.map((place) => (
            <li key={place.place_id}>
              <div role="button" tabIndex={0} onKeyPress={() => handleClick()} onClick={() => handleClick()}>
                <h4>{place.name}</h4>
                <div>
                  Address:
                  {' '}
                  {place.formatted_address}
                </div>
                <div>
                  Status:
                  {' '}
                  {place.business_status}
                </div>
                {renderRatings(place)}
              </div>
              <a href={renderLink()} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDirections} /></a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

List.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default List;
