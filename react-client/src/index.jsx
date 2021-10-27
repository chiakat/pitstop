/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTint, faToilet, faSearch, faHome, faMap, faListUl, faPlus,
} from '@fortawesome/free-solid-svg-icons';

import AddMarker from './components/AddMarker.jsx';
import List from './components/List.jsx';
import Map from './components/Map.jsx';
import AddForm from './components/AddForm.jsx';
import Directions from './components/Directions.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'home',
      currentLocation: '',
      inputLocation: '',
      toilets: true,
      water: false,
      results: [],
      newLocation: '',
      newLocationInfo: '',
      newAddress: '',
      destination: '',
      distance: '',
      time: '',
      editMode: false,
    };

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleWater = this.toggleWater.bind(this);
    this.toggleToilets = this.toggleToilets.bind(this);
    this.updateResults = this.updateResults.bind(this);
    // this.getCurrentLocation = this.getCurrentLocation(this);
    this.getNewLocation = this.getNewLocation.bind(this);
    this.getNewLocationInfo = this.getNewLocationInfo.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.getDistanceTime = this.getDistanceTime.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    this.setState({
      inputLocation: e.target.value,
    });
  }

  handleSearch(e) {
    const { inputLocation } = this.state;
    e.preventDefault();
    console.log('Searching', inputLocation);
    if (!inputLocation) {
      alert('Please enter a location');
    } else {
      this.changeView('map');
    }
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

  getDistanceTime(dist, time) {
    this.setState({
      distance: dist,
      duration: time,
    });
  }

  getDestination(place) {
    this.setState({
      destination: place,
    });
  }

  getDirections(route) {
    this.setState({
      directions: route,
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
    console.log('results to send', searchResults);
    this.setState({
      results: searchResults,
    });
    const {
      place_id, business_status, formatted_address, geometry, name,
      opening_hours, photos, rating, user_ratings_total,
    } = searchResults[0];
    axios.post('/saveResults', {
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
      results, toilets, water, newAddress, destination, getDirections,
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

        />
      );
    } if (view === 'add') {
      return (
      //   <Map
      //     changeView={this.changeView}
      //     updateResults={this.updateResults}
      //     getNewLocation={this.getNewLocation}
      //     getNewLocationInfo={this.getNewLocationInfo}
      //     getDirections={this.getDirections}
      //     inputText={inputLocation}
      //     currentLocation={currentLocation}
      //     toilets={toilets}
      //     water={water}
      //     newLocationInfo={newLocationInfo}
      //     editMode={editMode}
      //   />
        <AddForm
          changeView={this.changeView}
          newLocation={newLocation}
          newLocationInfo={newLocationInfo}
          newAddress={newAddress}
        />
      );
    }
    if (view === 'directions') {
      return (
        <Directions
          changeView={this.changeView}
          destination={destination}
          currentLocation={currentLocation}
          getDirections={this.getDirections}
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
              {/* <FontAwesomeIcon icon={faToilet} /> */}
              Toilets
            </button>
            <button
              type="button"
              id={water ? 'water-active' : 'water-inactive'}
              onClick={this.toggleWater}
            >
              {/* <FontAwesomeIcon icon={faTint} /> */}
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
        {/* <p>Toilets &#38; Tap</p> */}
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
        {/* <div className="footer">
          <a target="_blank" href="https://icons8.com/icon/2538/toilet">Toilet</a>,
          <a target="_blank" href="https://icons8.com/icon/CCbPUyD6avdx/water">Water</a>,
          <a target="_blank" href="https://icons8.com/icon/85149/marker">Marker</a>,
          <a target="_blank" href="https://icons8.com/icon/10660/drinking-fountain"> Drinking Fountain </a>
           icons by
          <a target="_blank" href="https://icons8.com"> Icons8. </a>
        </div> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('toiletntap'));
