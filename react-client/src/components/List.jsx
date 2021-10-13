import React from 'react';

const List = ({results}) => {

  const handleClick = (place) => {
    console.log('clicked', place);
  }

  return (
    <div class="results">
      <h2>Results</h2>
      <ul id="places"></ul>
      {results.map((place) => (
        <li onClick={handleClick}>{place.name}</li>
      ))}
    </div>
  )

}

export default List;