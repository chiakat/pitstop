import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Add from './components/Add.jsx';
import List from './components/List.jsx';
import Map from './components/Map.jsx';
// import Home from './components/Home.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'home',
      location: '',
      toilets: true,
      water: false
    };

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleWater = this.toggleWater.bind(this);
    this.toggleToilets = this.toggleToilets.bind(this);

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

  renderView() {
    const { view, location } = this.state;
    if (view === 'map') {
      return <Map changeView={this.changeView} inputText={this.state.location} />;
    } else if (view === 'list') {
      return <List changeView={this.changeView} inputText={this.state.location} />;
    } else if (view === 'add') {
      return <Add changeView={this.changeView}/>;
    } else {
      return (
        <>
        <div> Find...
        <div className="search">
          <button onClick={this.toggleToilets}>Toilets</button>
          <button onClick={this.toggleWater}>Water</button>
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
            <button>Go!</button>
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
