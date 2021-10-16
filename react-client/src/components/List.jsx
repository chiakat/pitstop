import React from 'react';
import PropTypes from 'prop-types';

const List = ({ results }) => {
  const handleClick = (place) => {
    console.log('clicked', place);
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

  // const renderPhoto = (place) => {
  //   if (place.photos) {
  //       return place.photos[0].html_attributions[0];
  //   }
  //   return null;
  // }

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
