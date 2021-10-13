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
      public: true,
      accessible: true,
      male: true,
      female: true,
      family: false,
      unisex: false,
      free: true,
      key_req: false,
      verified: false,
      avg_rating: 0,
      count_rating: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // componentDidMount() {
  //   fetch()
  // }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // check for errors in form before submission
  // Requires all input fields to have a value before a submission can be made.
  // Performs input validation on the email address. (Email must be of form local@domain.)
  // Upon submission, sends the RSVP data to your Express server.
  handleSubmit(event) {

    const { firstName, lastName, email, numberOfGuests } = this.state;
    event.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || numberOfGuests === 0) {
      alert('Please complete all fields to submit.');
    } else if (email.search('\@') === -1) {
      alert('Please enter a valid email.');
    } else {
      console.log('clicked')
      // send data with axios
      axios.post('/rsvps', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        numberOfGuests: numberOfGuests
      })
        .then((response) => {
          console.log('success')
          console.log(response);
          // clear states after successful submission
          this.setState = {
            firstName: '',
            lastName: '',
            email: '',
            numberOfGuests: 0
          };
          alert('Success! Thanks for your RSVP!');
        })
        .catch((error) => {
          console.log(error);
          alert('Your request could not be completed. Please try again.');
        })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <button onSubmit={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}


export default AddForm;