import React from 'react';

const List = ({results}) => {

  const handleClick = (place) => {
    console.log('clicked', place);
  }

  const renderRatings = (place) => {
    if (place.user_ratings_total > 0) {
        return <div>⭐ {place.rating} &#40;{place.user_ratings_total}&#41; </div>
    }
    return null;
  }

  return (
    <>
    <div className="filters">
      <button id="accessible">Accessible</button>
      <button id="open">Open Now</button>
      <button id="free">Free</button>
    </div>
    <div className="results">
      <ul id="places">
      {results.map((place) => (
        <li key={place.place_id} onClick={handleClick}>
          <h4>{place.name}</h4>
          <div>Address: {place.formatted_address}</div>
          <div>Status: {place.business_status}</div>
          {renderRatings(place)}
          <div>{place.buiness_status}</div>
        </li>
      ))}
      </ul>
    </div>
    </>
  )

}

export default List;