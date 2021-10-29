import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

const List = ({
  results, changeView, inputText, currentLocation,
}) => {
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
    const originLat = currentLocation.lat;
    const originLng = currentLocation.lng;
    const inputTextArr = inputText.split(' ');
    const inputTextQuery = inputTextArr.reduce((prevWord, currentWord) => `${prevWord}+${currentWord}`);
    console.log(inputTextQuery);
    const placeLat = place.geometry.location.lat();
    const placeLng = place.geometry.location.lng();
    if (currentLocation === '') {
      return `https://www.google.com/maps/dir/?api=1&origin=${inputTextQuery}&destination=${placeLat},${placeLng}&travelmode=walking`;
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${placeLat},${placeLng}$travelmode=walking`;
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
              <a href={renderLink(place)} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDirections} /></a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

List.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

List.defaultProps = {
  currentLocation: '',
};

export default List;
