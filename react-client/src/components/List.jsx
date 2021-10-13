import React from 'react';

const List = (placesList) => {

  return (
    <div id="sidebar">
      <h2>Results</h2>
      <ul id="places"></ul>
      {placesList.map((place) => (
        <li onClick={handleClick}>{place.name}</li>
      ))}
    </div>
  )

}

export default List;