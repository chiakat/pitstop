import React from 'react';

const List = ({results}) => {

  const handleClick = (place) => {
    console.log('clicked', place);
  }

  return (
    <>
    <div className="filters">
      <button id="accessible">Accessible</button>
      <button id="open">Open Now</button>
      <button id="free">Free</button>
    </div>
    <div className="results">
      <h2>Results</h2>
      <ul id="places"></ul>
      {results.map((place) => (
        <li onClick={handleClick}>{place.name}</li>
      ))}
    </div>
    </>
  )

}

export default List;