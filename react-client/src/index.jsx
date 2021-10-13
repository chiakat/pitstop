import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import AddMarker from './components/AddMarker.jsx';
import List from './components/List.jsx';
import Map from './components/Map.jsx';
import AddForm from './components/AddForm.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'home',
      location: '',
      toilets: true,
      water: false,
      results: [],
    };

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleWater = this.toggleWater.bind(this);
    this.toggleToilets = this.toggleToilets.bind(this);
    this.updateResults = this.updateResults.bind(this);
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
      location: e.target.value,
    })
  }

  handleSearch(e) {
    e.preventDefault();
    console.log('Searching', this.state.location)
    if (!this.state.location) {
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

  renderView() {
    const { view, location, results } = this.state;
    if (view === 'map') {
      return <Map changeView={this.changeView} updateResults={this.updateResults} inputText={location} />;
    } else if (view === 'list') {
      return <List changeView={this.changeView} results={results} inputText={location} />;
    } else if (view === 'add') {
      return <AddForm changeView={this.changeView}/>;
    } else {
      return (
        <>
        <div className="search-container"> Find...
        <div className="search">
          <button id="toilets" onClick={this.toggleToilets}>Toilets</button>
          <button id="water" onClick={this.toggleWater}>Water</button>
        </div>
          <form onSubmit={(e) => this.handleSearch(e)}>
            <input
              type='search'
              id='search'
              placeholder='Enter a location...'
              name='q'
              value={this.state.location}
              onChange={(e) => this.handleChange(e)}
            />
            <button id="go">Go!</button>
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('toiletntap'));
