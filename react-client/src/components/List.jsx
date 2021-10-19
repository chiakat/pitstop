import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';

const List = ({ results, changeView }) => {
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

List.propTypes = {
  results: PropTypes.arrayOf.isRequired,
};

export default List;
