import React from "react";
import { Redirect } from "react-router-dom";
import { updateBio } from "../../services/apiService";
import "./UpdateBio.css";

class UpdateBio extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      updated: false,
      image: this.props.location.state.image,
      bio: this.props.location.state.bio,
      gender: this.props.location.state.gender,
      gender_preference: this.props.location.state.interest,
      location: this.props.location.state.location,
    };
  }

  handleChange = (e) => {
    const currentElement = e.target;
    const { name, value, type, checked } = currentElement;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, name, image, bio, gender, gender_preference, location } =
      this.state;
    const bios = {
      userId,
      name,
      image,
      bio,
      gender,
      gender_preference,
      location,
    };
    const id = this.props.location.state.bioId;
    await updateBio(id, bios);
    this.setState({ updated: true });
  };

  render() {
    if (this.state.updated) {
      return <Redirect to="/dashboard"></Redirect>;
    }
    return (
      <div className="update-profile">
        <h1>Update Your Profile?</h1>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="image">Image URL (.png/.jpg):</label>
          <input name="image" type="text" value={this.state.image} />
          <label htmlFor="bio">Description:</label>
          <textarea name="bio" type="text" value={this.state.bio} />
          <br />
          <div className="radio-row">
            <span className="dropdown">
              <label htmlFor="gender-select">
                <b>Gender</b>
              </label>
              <select
                id="gender-select"
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </span>
          </div>
          <div className="radio-row">
            <span className="dropdown">
              <label htmlFor="gender-select">
                <b>Interest</b>
              </label>
              <select
                id="interest-select"
                name="gender_preference"
                value={this.state.gender_preference}
                onChange={this.handleChange}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="either">Either</option>
              </select>
            </span>
          </div>
          <label htmlFor="location">Location:</label>
          <input name="location" type="text" value={this.state.location} />
          <div className="submit">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateBio;
