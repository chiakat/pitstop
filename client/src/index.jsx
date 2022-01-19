/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faHome, faMap, faListUl, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import List from './components/List.jsx';
import Map from './components/Map.jsx';
import AddForm from './components/AddForm.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'home',
      currentLocation: '',
      inputLocation: '',
      inputLatLng: '',
      toilets: true,
      water: false,
      results: [],
      newLocation: '',
      newLocationInfo: '',
      newAddress: '',
      destination: '',
    };

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleWater = this.toggleWater.bind(this);
    this.toggleToilets = this.toggleToilets.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.getNewLocation = this.getNewLocation.bind(this);
    this.getNewLocationInfo = this.getNewLocationInfo.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.updateLatLng = this.updateLatLng.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputLocation: e.target.value,
    });
  }

  handleSearch(e) {
    const { inputLocation } = this.state;
    e.preventDefault();
    if (!inputLocation) {
      alert('Please enter a location');
    } else if (inputLocation === 'Use Current Location') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              currentLocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
        );
      } else {
        alert('Please enable location services');
      }
    }
    this.changeView('map');
  }

  getNewLocation(location) {
    this.setState({
      newLocation: location,
    });
  }

  getNewLocationInfo(info) {
    this.setState({
      newLocationInfo: info,
    });
  }

  getDestination(place) {
    this.setState({
      destination: place,
    });
  }

  updateLatLng(latLng) {
    this.setState({
      inputLatLng: latLng,
    });
  }

  toggleToilets() {
    const { toilets } = this.state;
    this.setState({
      toilets: !toilets,
    });
  }

  toggleWater() {
    const { water } = this.state;
    this.setState({
      water: !water,
    });
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  updateResults(searchResults) {
    // send results to database
    this.setState({
      results: searchResults,
    });
    const {
      place_id, business_status, formatted_address, geometry, name,
      opening_hours, photos, rating, user_ratings_total,
    } = searchResults[0];
    axios.post('/api/saveResults', {
      status: business_status,
      address: formatted_address,
      location: geometry.location,
      latitude: geometry.location.lat(),
      longitude: geometry.location.lng(),
      name,
      // array of opening periods covering 7 days, starting Sunday
      hours: opening_hours,
      photos,
      place_id,
      rating,
      user_ratings_total,
      type: 'toilet',
    });
  }

  renderView() {
    const {
      view, inputLocation, currentLocation, newLocation, newLocationInfo,
      results, toilets, water, newAddress, destination, inputLatLng,
    } = this.state;
    if (view === 'map') {
      this.renderNavBar();
      return (
        <Map
          changeView={this.changeView}
          updateResults={this.updateResults}
          getNewLocation={this.getNewLocation}
          getNewLocationInfo={this.getNewLocationInfo}
          getDirections={this.getDirections}
          updateLatLng={this.updateLatLng}
          inputText={inputLocation}
          currentLocation={currentLocation}
          toilets={toilets}
          water={water}
          newLocationInfo={newLocationInfo}
        />
      );
    } if (view === 'list') {
      return (
        <List
          changeView={this.changeView}
          results={results}
          inputText={inputLocation}
          currentLocation={currentLocation}
          destination={destination}
          getDirections={this.getDirections}
          inputLatLng={inputLatLng}
        />
      );
    } if (view === 'add') {
      return (
        <AddForm
          changeView={this.changeView}
          newLocation={newLocation}
          newLocationInfo={newLocationInfo}
          newAddress={newAddress}
        />
      );
    }
    return (
      <>
        <div className="search-container">
          {' '}
          Find...
          <div className="search">
            <button
              type="button"
              id={toilets ? 'toilets-active' : 'toilets-inactive'}
              onClick={this.toggleToilets}
            >
              Toilets
            </button>
            <button
              type="button"
              id={water ? 'water-active' : 'water-inactive'}
              onClick={this.toggleWater}
            >
              Water
            </button>
          </div>
          <form onSubmit={(e) => this.handleSearch(e)}>
            <input
              list="searchList"
              type="search"
              id="search"
              placeholder="Enter a location..."
              value={inputLocation}
              onChange={(e) => this.handleChange(e)}
            />
            <datalist id="searchList">
              <option value="Use Current Location">Use Current Location</option>
            </datalist>
            <button type="submit" id="go"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
        <div className="footer">
          <a target="_blank" href="https://icons8.com/icon/2538/toilet" rel="noreferrer">Toilet</a>
          ,
          <a target="_blank" href="https://icons8.com/icon/CCbPUyD6avdx/water" rel="noreferrer">Water</a>
          ,
          <a target="_blank" href="https://icons8.com/icon/85149/marker" rel="noreferrer">Marker</a>
          ,
          <a target="_blank" href="https://icons8.com/icon/10660/drinking-fountain" rel="noreferrer"> Drinking Fountain </a>
          icons by
          <a target="_blank" href="https://icons8.com" rel="noreferrer"> Icons8. </a>
        </div>
      </>
    );
  }

  renderNavBar() {
    const { view } = this.state;
    if (view !== 'home') {
      return (
        <div className="nav">
          <span
            className="logo"
            role="button"
            tabIndex={0}
            onKeyPress={() => this.changeView('home')}
            onClick={() => this.changeView('home')}
          >
            <FontAwesomeIcon icon={faHome} />
          </span>
          <span
            className={view === 'map'
              ? 'nav-selected'
              : 'nav-unselected'}
            role="button"
            tabIndex={0}
            onKeyPress={() => this.changeView('map')}
            onClick={() => this.changeView('map')}
          >
            <FontAwesomeIcon icon={faMap} />
          </span>
          <span
            className={view === 'list'
              ? 'nav-selected'
              : 'nav-unselected'}
            role="button"
            tabIndex={0}
            onKeyPress={() => this.changeView('list')}
            onClick={() => this.changeView('list')}
          >
            <FontAwesomeIcon icon={faListUl} />
          </span>
          <span
            className={view === 'add'
              ? 'nav-selected'
              : 'nav-unselected'}
            role="button"
            tabIndex={0}
            onKeyPress={() => this.changeView('add')}
            onClick={() => this.changeView('add')}
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
      );
    }
    return (
      <div className="header">
        <img id="logo" alt="toilet and tap logo" src="/images/toilettaplogo_white.png" />
        <h3>PitStop</h3>
      </div>
    );
  }

  render() {
    return (
      <div className="fullscreen">
        {this.renderNavBar()}
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('toiletntap'));
