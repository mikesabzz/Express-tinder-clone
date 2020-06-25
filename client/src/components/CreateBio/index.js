import React from 'react';
import './CreateBio.css';
import { Redirect } from 'react-router-dom';
import { createBio } from '../../services/apiService'

class CreateBio extends React.Component {
  constructor(props) {
    super(props)

    this.props = props
    this.state = {
      created: false,
      name: '',
      userId: props.user.id,
      gender: '',
      gender_preference: ''
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
    await createBio(bios);
    this.setState({ created: true })
  }

  render() {
    if (this.state.created) { return <Redirect to="/dashboard"></Redirect> }
    return (
      <div className="profile-create">
        <h1>Create Your Profile:</h1>
        <form onChange={this.handleChange} value={this.state.selectedValue} onSubmit={this.handleSubmit}>
          <label htmlFor="image">Image URL (.png/.jpg):</label>
          <input name="image" type="text" />
          <br />
          <label htmlFor="bio">Description:</label>
          <br />
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
          </span>
          <br />
          <label htmlFor="location">Location:</label>
          <input name="location" type="text" />
          <div className="submit"><input type="submit" /></div>
        </form>
      </div>
    );
  };
}

export default CreateBio