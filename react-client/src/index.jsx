import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Add from './components/Add.jsx';
import List from './components/List.jsx';
import Map from './components/Map.jsx';
import Home from './components/Home.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'home',
      selectedItem: ''
    };

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderMap = this.renderMap.bind(this);

  }

  componentDidMount() {

  }

  renderMap() {
    $.get('/', null, (data) => {

    });
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
    const {view } = this.state;
    if (view === 'map') {
      return <Map handleClick={this.handleClick} />;
    } else if (view === 'list') {
      return <List handleClick={this.handleClick} />;
    } else if (view === 'add') {
      return <Add />;
    } else {
      return <Home />;
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
            Find Water and Restrooms
          </span>
          <span className={this.state.view === 'list'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('list')}>
            List All Nearby
          </span>
          <span className={this.state.view === 'add'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('add')}>
            Add a restroom or water fountain
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
