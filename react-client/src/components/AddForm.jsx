import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: '',
      name: '',
      location: '',
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
      avg_rating: 0,
      count_rating: 0,
      type: 'toilet',
      formatted_address: '',
      business_status: 'O'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSelection = this.handleSelection(this);
    // this.handleRating = this.handleRating(this);
  }

  // componentDidMount() {
  //   fetch()
  // }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // handleSelection(event) {
  //   if (event.target.value === 'private') {
  //     this.setState({
  //       publicOrPrivate: false,
  //     })
  //   } else {
  //     this.setState({
  //       publicOrPrivate: true,
  //     })
  //   }
  // }

  // handleRating(event) {
  //   this.setState({
  //     rating: event.target.value,
  //   })
  // }
  // check for errors in form before submission
  // Requires all input fields to have a value before a submission can be made.
  // Performs input validation on the email address. (Email must be of form local@domain.)
  // Upon submission, sends the RSVP data to your Express server.
  handleSubmit(event) {

    const { placeId, name,location, directions, hours, publicOrPrivate, isAccessible, male, female,
      hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type } = this.state;
    event.preventDefault();
    if (name === '' || location === '' || rating === 0) {
      alert('Please provide a name and rating to submit.');
     }
      console.log('clicked')
      // send data with axios
      axios.post('/addRecord', {
        placeId: placeId,
        name: name,
        location: location,
        directions: directions,
        hours: hours,
        publicOrPrivate: publicOrPrivate,
        isAccessible: isAccessible,
        male: male,
        female: female,
        hasToiletPaper: hasToiletPaper,
        hasSoap: hasSoap,
        hasChangingTable: hasChangingTable,
        unisex: unisex,
        isFree: isFree,
        needKey: needKey,
        isVerified: isVerified,
        rating: rating,
        type: type,
      })
        .then((response) => {
          console.log('success')
          console.log(response);
          // clear states after successful submission
          this.setState = {
            placeId: '',
            name: '',
            location: '',
            directions: '',
            hours: '',
            publicOrPrivate: true,
            isAccessible: true,
            male: true,
            female: true,
            hasChangingTable: false,
            unisex: false,
            isFree: true,
            needKey: false,
            isVerified: false,
            rating: 0,
            avg_rating: 0,
            count_rating: 0,
            type: 'toilet',
          };
          alert('Success! Thanks for your RSVP!');
        })
        .catch((error) => {
          console.log(error);
          alert('Your request could not be completed. Please try again.');
        })
    }


  render() {
    return (
        <form className='addForm' onSubmit={this.handleSubmit}>
          <label>
            Add a new
            <br />
            <select name="type" type="string" onChange={this.handleInputChange}>
              <option defaultValue="toilet">Toilet</option>
              <option value='water'>Water</option>
            </select>
          </label>
          <br />
          <label>
            Name of Location:
            <input
              name="name"
              type="text"
              placeholder="Ferry Building"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Additional Directions:
            <input
              name="directions"
              type="text"
              placeholder="i.e. on the second floor around the corner"
              value={this.state.directions}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Operating Hours:
            <input
              name="hours"
              type="text"
              placeholder="i.e. Mon-Fri 9am-7pm, Sat-Sun 9am-3pm"
              value={this.state.hours}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Public or Private?
            <br />
            <select name="public" type="string" onChange={this.handleInputChange}>
              <option defaultValue="public">Public</option>
              <option value='private'>Private</option>
            </select>
          </label>
          <br />
          <label>
            Your Rating
            <br />
            <select name="rating" type="number" onChange={this.handleInputChange}>
              <option defaultValue="0">-</option>
              <option value='5'>5</option>
              <option value='4'>4</option>
              <option value='3'>3</option>
              <option value='2'>2</option>
              <option value='1'>1</option>
            </select>
          </label>

          <div className="checkboxes">
            <h4>Please select all that apply:</h4>

            <label>
              <input name="isFree" type="checkbox" checked={this.state.isFree} onChange={this.handleInputChange} />
              Free
            </label>
            <br />
            <label>
              <input name="needKey" type="checkbox" checked={this.state.needKey} onChange={this.handleInputChange} />
              Key Required
            </label>
            <br />
            <label>
              <input name="isAccessible" type="checkbox" checked={this.state.isAccessible} onChange={this.handleInputChange} />
              Accessible
            </label>
            <br />
            <label>
              <input name="male" type="checkbox" checked={this.state.male} onChange={this.handleInputChange} />
              Male
            </label>
            <br />
            <label>
              <input name="female" type="checkbox" checked={this.state.female} onChange={this.handleInputChange} />
              Female
            </label>
            <br />
            <label>
              <input name="unisex" type="checkbox" checked={this.state.unisex} onChange={this.handleInputChange} />
              Unisex
            </label>
            <br />
            <label>
              <input name="hasToiletPaper" type="checkbox" checked={this.state.hasToiletPaper} onChange={this.handleInputChange} />
              Has Toilet Paper
            </label>
            <br />
            <label>
              <input name="hasSoap" type="checkbox" checked={this.state.hasSoap} onChange={this.handleInputChange} />
              Has Soap
            </label>
            <br />
            <label>
              <input name="hasChangingTable" type="checkbox" checked={this.state.hasChangingTable} onChange={this.handleInputChange} />
              Has Changing Table
            </label>
            <br />
          </div>
          <br />
          <button id="submit" onSubmit={this.handleSubmit}>Submit</button>
        </form>
    );
  }

}

export default AddForm;