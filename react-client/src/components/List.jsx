/* eslint-disable react/prop-types */
/* global google */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

const List = ({
  results, currentLocation, inputLatLng,
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
    const placeLat = place.geometry.location.lat();
    const placeLng = place.geometry.location.lng();
    if (currentLocation === '') {
      return `https://www.google.com/maps/dir/?api=1&origin=${inputLatLng.lat},${inputLatLng.lng}&destination=${placeLat},${placeLng}&travelmode=walking`;
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${placeLat},${placeLng}&travelmode=walking`;
  };

  // get distance between the current location and result marker
  const distService = new google.maps.DistanceMatrixService();

  const renderDistance = (place) => {
    let placeDistance;
    distService.getDistanceMatrix(
      {
        origins: [currentLocation !== '' ? currentLocation : inputLatLng],
        destinations: [place.geometry.location],
        travelMode: 'WALKING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: true,
        avoidTolls: true,
      }, (response, status) => {
        if (status !== 'OK' || !response) return;
        placeDistance = response.rows[0].elements[0].distance.text;
        console.log(placeDistance);
      },
    );
    return placeDistance;
  };

  const renderDuration = (place) => {
    let placeDuration;
    distService.getDistanceMatrix(
      {
        origins: [currentLocation !== '' ? currentLocation : inputLatLng],
        destinations: [place.geometry.location],
        travelMode: 'WALKING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: true,
        avoidTolls: true,
      }, (response, status) => {
        if (status !== 'OK' || !response) return;
        placeDuration = response.rows[0].elements[0].duration.text;
        console.log(placeDuration);
      },
    );
    return placeDuration;
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
            <li key={place.place_id} className="list-item">
              <div role="button" tabIndex={0}>
                <h4>{place.name}</h4>
                <span className="dist">
                  {renderDistance(place)}
                </span>
                <span className="duration">
                  {renderDuration(place)}
                </span>
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
              <a href={renderLink(place)} target="_blank" rel="noreferrer" aria-label="Directions"><FontAwesomeIcon icon={faDirections} /></a>
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
