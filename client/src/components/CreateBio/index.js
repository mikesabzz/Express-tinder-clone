import React from "react";
import "./CreateBio.css";
import { Redirect } from "react-router-dom";
import { createBio } from "../../services/apiService";

class CreateBio extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      created: false,
      name: "",
      userId: props.user.id,
      gender: "",
      gender_preference: "",
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
    await createBio(bios);
    this.setState({ created: true });
  };

  render() {
    if (this.state.created) {
      return <Redirect to="/dashboard"></Redirect>;
    }
    return (
      <div className="profile-create">
        <h1>Create Your Profile:</h1>
        <form
          onChange={this.handleChange}
          value={this.state.selectedValue}
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="image">Image URL (.png/.jpg):</label>
          <input name="image" type="text" />
          <br />
          <label htmlFor="bio">Description:</label>
          <br />
          <textarea name="bio" type="text" required />
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
                <option>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </span>
          </div>
          <div className="radio-row">
            <span className="dropdown">
              <label htmlFor="gender-interest">
                <b>Gender Interest</b>
              </label>
              <select
                id="gender-interest"
                name="gender_preference"
                value={this.state.gender_preference}
                onChange={this.handleChange}
              >
                <option>Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="either">Either</option>
              </select>
            </span>
          </div>
          <label htmlFor="location">Location:</label>
          <input name="location" type="text" />
          <div className="submit">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateBio;
