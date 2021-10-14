import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faToilet, faSearch} from '@fortawesome/free-solid-svg-icons';

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
    };

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleWater = this.toggleWater.bind(this);
    this.toggleToilets = this.toggleToilets.bind(this);
    this.updateResults = this.updateResults.bind(this);
    // this.getCurrentLocation = this.getCurrentLocation(this);
    this.getNewLocation = this.getNewLocation.bind(this);
  }

  componentDidMount() {

  }

  toggleToilets() {
    this.setState({
      toilets: !this.state.toilets,
    })
  }

  toggleWater() {
    this.setState({
      water: !this.state.water,
    })
  }

  handleChange(e) {
    this.setState({
      inputLocation: e.target.value,
    })
  }

  handleSearch(e) {
    e.preventDefault();
    console.log('Searching', this.state.inputLocation)
    if (!this.state.inputLocation) {
      alert('Please enter a location');
    } else {
      this.changeView('map');
    }
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  // changes the featured post to the item that was clicked
  // by setting state to the id of the post
  handleClick(target, e) {
    this.changeView('');
    this.setState({
      selectedItem: target,
    });
  }

  updateResults(searchResults) {
    this.setState({
      results: searchResults,
    })
  }

  getNewLocation(location) {
    this.setState({
      newLocation: location,
    })
  }

  // // use current location
  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.setState({
  //           currentLocation: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           }
  //         })
  //       }
  //     );
  //   this.changeView('map');
  //   }
  //   else {
  //     alert('Please enable location services')
  //   }
  // }

  renderView() {
    const { view, inputLocation, currentLocation, newLocation, results, toilets, water } = this.state;
    if (view === 'map') {
      return <Map changeView={this.changeView} updateResults={this.updateResults} getNewLocation={this.getNewLocation} inputText={inputLocation} currentLocation={currentLocation} toilets={toilets} water={water} />;
    } else if (view === 'list') {
      return <List changeView={this.changeView} results={results} inputText={inputLocation} currentLocation={currentLocation} />;
    } else if (view === 'add') {
      return <AddForm changeView={this.changeView} newLocation={newLocation}/>;
    } else {
      return (
        <>
        <div className="search-container"> Find...
        <div className="search">
          <button id="toilets" onClick={this.toggleToilets}>Toilets</button>
          <button id="water" onClick={this.toggleWater}>Water</button>
        </div>
        {/* <div>
          <button id="go" onClick={() => this.getCurrentLocation()}>Search Near Me</button>
          <span>Enable Location Services to use current location</span>
        </div> */}
          <form onSubmit={(e) => this.handleSearch(e)}>
            <input
              list='searchList'
              type='search'
              id='search'
              placeholder='Enter a location...'
              value={this.state.inputLocation}
              onChange={(e) => this.handleChange(e)}
            />
            <datalist id='searchList'>
              <option value="Use Current Location">Use Current Location</option>
            </datalist>
            <button id="go"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo"
            onClick={() => this.changeView('home')}>
            Toilet and Tap
          </span>
          <span className={this.state.view === 'map'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('map')}>
            Map
          </span>
          <span className={this.state.view === 'list'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('list')}>
            List
          </span>
          <span className={this.state.view === 'add'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('add')}>
            Add More
          </span>
        </div>

        <div className="main">
          {this.renderView()}
        </div>
        <div className="footer">
          <a target="_blank" href="https://icons8.com/icon/2538/toilet"><FontAwesomeIcon icon={faToilet} />Toilet</a>,
          <a target="_blank" href="https://icons8.com/icon/CCbPUyD6avdx/water"><FontAwesomeIcon icon={faTint} /> Water</a>,
          <a target="_blank" href="https://icons8.com/icon/85149/marker">Marker</a>,
          <a target="_blank" href="https://icons8.com/icon/10660/drinking-fountain"> Drinking Fountain </a>
           icons by
          <a target="_blank" href="https://icons8.com"> Icons8. </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('toiletntap'));
