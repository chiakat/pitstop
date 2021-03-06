/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place_id: '',
      name: '',
      directions: '',
      hours: '',
      publicOrPrivate: '',
      isAccessible: false,
      male: false,
      female: false,
      unisex: false,
      isFree: false,
      needKey: false,
      isVerified: false,
      hasToiletPaper: false,
      hasSoap: false,
      hasChangingTable: false,
      rating: 0,
      type: 'toilet',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   fetch()
  // }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const {
      place_id, name, directions, hours, publicOrPrivate, isAccessible, male, female,
      hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type,
    } = this.state;
    const { newLocation, newAddress } = this.props;
    event.preventDefault();
    if (name === '' || rating === 0) {
      alert('Please provide a name and rating to submit.');
    } else {
      // send data with axios
      axios.post('/addRecord', {
        place_id,
        name,
        location: newLocation,
        address: newAddress,
        directions,
        hours,
        publicOrPrivate,
        isAccessible,
        male,
        female,
        hasToiletPaper,
        hasSoap,
        hasChangingTable,
        unisex,
        isFree,
        needKey,
        isVerified,
        rating,
        type,
      })
        .then(() => {
          const { changeView } = this.props;
          // clear states after successful submission
          this.setState({
            place_id: '',
            name: '',
            directions: '',
            hours: '',
            publicOrPrivate: '',
            isAccessible: false,
            male: false,
            female: false,
            unisex: false,
            isFree: false,
            needKey: false,
            isVerified: false,
            hasToiletPaper: false,
            hasSoap: false,
            hasChangingTable: false,
            rating: 0,
            type: 'toilet',
          });
          alert('Success! Thanks for your submission!');
          // return to map
          changeView('map');
        })
        .catch((error) => {
          console.log(error);
          alert('Your request could not be completed. Please try again.');
        });
    }
  }

  render() {
    const {
      place_id, name, directions, hours, isAccessible, male, female,
      hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey,
    } = this.state;
    return (
      <form className="addForm" onSubmit={this.handleSubmit}>
        <label>
          Add a new
          <br />
          <select name="type" type="string" onChange={this.handleInputChange}>
            <option defaultValue="toilet">Toilet</option>
            <option value="water">Water</option>
          </select>
        </label>
        <br />
        <label>
          Name of Location:
          <input
            name="name"
            type="text"
            placeholder="i.e. Ferry Building"
            value={name}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Additional Directions:
          <input
            name="directions"
            type="text"
            placeholder="i.e. on the second floor around the corner"
            value={directions}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Operating Hours:
          <input
            name="hours"
            type="text"
            placeholder="i.e. Mon-Fri 9am-7pm, Sat-Sun 9am-3pm"
            value={hours}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Public or Private?
          <br />
          <select name="public" type="string" onChange={this.handleInputChange}>
            <option defaultValue="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
        <br />
        <label>
          Your Rating
          <br />
          <select name="rating" type="number" onChange={this.handleInputChange}>
            <option defaultValue="0">-</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>

        <div className="checkboxes">
          <h4>Please select all that apply:</h4>

          <label>
            <input name="isFree" type="checkbox" checked={isFree} onChange={this.handleInputChange} />
            Free
          </label>
          <br />
          <label>
            <input name="needKey" type="checkbox" checked={needKey} onChange={this.handleInputChange} />
            Key Required
          </label>
          <br />
          <label>
            <input name="isAccessible" type="checkbox" checked={isAccessible} onChange={this.handleInputChange} />
            Accessible
          </label>
          <br />
          <label>
            <input name="male" type="checkbox" checked={male} onChange={this.handleInputChange} />
            Male
          </label>
          <br />
          <label>
            <input name="female" type="checkbox" checked={female} onChange={this.handleInputChange} />
            Female
          </label>
          <br />
          <label>
            <input name="unisex" type="checkbox" checked={unisex} onChange={this.handleInputChange} />
            Unisex
          </label>
          <br />
          <label>
            <input name="hasToiletPaper" type="checkbox" checked={hasToiletPaper} onChange={this.handleInputChange} />
            Has Toilet Paper
          </label>
          <br />
          <label>
            <input name="hasSoap" type="checkbox" checked={hasSoap} onChange={this.handleInputChange} />
            Has Soap
          </label>
          <br />
          <label>
            <input name="hasChangingTable" type="checkbox" checked={hasChangingTable} onChange={this.handleInputChange} />
            Has Changing Table
          </label>
          <br />
        </div>
        <br />
        <button type="submit" id="submit" onSubmit={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

AddForm.propTypes = {
  changeView: PropTypes.func.isRequired,
  newLocation: PropTypes.shape({
    lat: PropTypes.func,
    lng: PropTypes.func,
  }).isRequired,
  newAddress: PropTypes.string.isRequired,
};

export default AddForm;
