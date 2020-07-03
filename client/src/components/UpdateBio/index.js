import React from 'react';
import { Redirect } from 'react-router-dom';
import { updateBio } from '../../services/apiService'
import './UpdateBio.css'

class UpdateBio extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      updated: false,
      gender: this.props.location.state.gender,
      gender_preference: this.props.location.state.gender_preference
    }
  }

  handleChange = (e) => {
    const currentElement = e.target
    const { name, value, type, checked } = currentElement
    const newState = {};
    newState[name] = value
    this.setState(newState)
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { userId, name, image, bio, gender, gender_preference, location } = this.state
    const bios = { userId, name, image, bio, gender, gender_preference, location };
    const id = this.props.location.state.bioId
    await updateBio(id, bios);
    this.setState({ updated: true })
  }

  render() {
    if (this.state.updated) { return <Redirect to="/dashboard"></Redirect> }
    return (
      <div className="update-profile">
        <h1>Update Your Profile?</h1>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="image">Image URL (.png/.jpg):</label>
          <input name="image" type="text" />
          <label htmlFor="bio">Description:</label>
          <textarea name="bio" type="text" />
          <br />
          <span>
            Gender:
                <label htmlFor="gender">male
                  <input
                id="gender-checkbox"
                type="radio"
                name="gender"
                value="male"
                checked={this.state.gender === "male"}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="gender">female
                  <input
                id="gender-checkbox"
                type="radio"
                name="gender"
                value="female"
                checked={this.state.gender === "female"}
                onChange={this.handleChange}
              />
            </label>
          </span>
          <span>
            Gender Interest:
                <label htmlFor="gender_preference">men
                  <input
                id="gender-checkbox"
                type="radio"
                name="gender_preference"
                value="men"
                checked={this.state.gender_preference === "men"}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="gender_preference">women
                  <input
                id="gender-checkbox"
                type="radio"
                name="gender_preference"
                value="women"
                checked={this.state.gender_preference === "women"}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="gender_preference">either
                  <input
                id="gender-checkbox"
                type="radio"
                name="gender_preference"
                value="either"
                checked={this.state.gender_preference === "either"}
                onChange={this.handleChange}
              />
            </label>
          </span>
          <label htmlFor="location">Location:</label>
          <input name="location" type="text" />
          <div className="submit"><input type="submit" /></div>
        </form>
      </div>
    );
  };
}

export default UpdateBio