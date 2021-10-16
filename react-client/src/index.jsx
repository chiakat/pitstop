/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faToilet, faSearch } from '@fortawesome/free-solid-svg-icons';

import AddMarker from './components/AddMarker.jsx';
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
      toilets: true,
      water: false,
      results: [],
      newLocation: '',
      newLocationInfo: '',
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

  toggleToilets() {
    this.setState((prevState) => ({ toilets: !prevState }));
  }

  toggleWater() {
    this.setState((prevState) => ({ water: !prevState }));
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  updateResults(searchResults) {
    this.setState({
      results: searchResults,
    });
  }

  renderView() {
    const {
      view, inputLocation, currentLocation, newLocation, newLocationInfo, results, toilets, water,
    } = this.state;
    if (view === 'map') {
      this.renderNavBar();
      return (
        <Map
          changeView={this.changeView}
          updateResults={this.updateResults}
          getNewLocation={this.getNewLocation}
          getNewLocationInfo={this.getNewLocationInfo}
          inputText={inputLocation}
          currentLocation={currentLocation}
          toilets={toilets}
          water={water}
        />
      );
    } if (view === 'list') {
      return (
        <List
          changeView={this.changeView}
          results={results}
          inputText={inputLocation}
          currentLocation={currentLocation}
        />
      );
    } if (view === 'add') {
      return (
        <AddForm
          changeView={this.changeView}
          newLocation={newLocation}
          newLocationInfo={newLocationInfo}
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
            Home
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
            Map
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
            List
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
            Add More
          </span>
        </div>
      );
    }
    return (
      <div className="header">
        <img id="logo" alt="toilet and tap logo" src="/images/toilettaplogo_white.png" />
        <p>Toilets &#38; Tap</p>
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
