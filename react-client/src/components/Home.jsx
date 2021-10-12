import React, { useState} from 'react';

const Home = () => {

  const [location, setLocation] = useState('home');

  const handleChange = (e) => {
    setLocation(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching', location)
  }

  return (
    <>
    <h1>Toilet and Tap</h1>
    <div className="search">Find...
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