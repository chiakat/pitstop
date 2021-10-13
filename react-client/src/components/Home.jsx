import React, { useState} from 'react';

const Home = () => {

  // default location is San Francisco
  const [location, setLocation] = useState({lat: 37.7749, lng: 122.4194});

  const handleChange = (e) => {
    setLocation(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching', location)
    //insert api call for google maps
    //render map view after
  }

  return (
    <>
    <h1>Toilet and Tap</h1>
    <div className="search">Find...</div>
    <div className="buttons">
      <br>
      <button>Toilets</button>
      <button>Water</button>
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          type='search'
          id='search'
          placeholder='Enter a location...'
          name='q'
          value={location}
          onChange={(e) => handleChange(e)}
        />
        <button>Go!</button>
      </form>
    </div>
    </>
  )

}

export default Home;