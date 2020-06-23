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
            userId: props.user.id
        }
    }


  handleChange = (e) => {
    const currentElement = e.target
    const { name, value } = currentElement
    const newState = {};
    newState[name] = value
    this.setState(newState)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { userId, name, image, bio, gender, gender_preference, location } = this.state
    const bios = { userId, name, image, bio, gender, gender_preference, location};
    await createBio(bios);
    this.setState({created: true})
  }

    render() {
        if (this.state.created){return <Redirect to="/dashboard"></Redirect>}
        return (
            <div className="profile-create">
                    <h1>Create Your Profile:</h1>
                    <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <label htmlFor="image">Image URL (.png/.jpg):</label>
                        <input name="image" type="text" />
                        <br />
                        <label htmlFor="bio">Description:</label>
                        <br />
                        <textarea name="bio" type="text" />
                        <br />
                        <label htmlFor="gender">Gender:</label>
                        <select>
                          <option name="gender">male</option>
                          <option name="gender">female</option>
                        </select>
                        <label htmlFor="gender_preference">Gender Interest:</label>
                        <select>
                          <option name="gender_preference">men</option>
                          <option name="gender_preference">women</option>
                          <option name="gender_preference">both</option>
                        </select>
                        <br />
                        <label htmlFor="location">Location:</label>
                        <input name="location" type="text" />
                        <div className="submit"><input type = "submit" /></div> 
                    </form>
            </div>
        );
    };
}

export default CreateBio