import React from 'react';
import './CreateBio.css';
import { Redirect } from 'react-router-dom';
import { createBio } from '../../services/apiService'
import './CreateBio.css'

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
    const { userId, name, bio } = this.state
    const bios = { userId, name, bio};
    await createBio(bios);
    this.setState({created: true})
  }

    render() {
        if (this.state.created){return <Redirect to="/dashboard"></Redirect>}
        return (
            <div className="bios">
                    <h1>Create Your Bio:</h1>
                    <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <label for="bio">Bio:</label>
                        <input name="bio" type="text" />
                    </form>
            </div>
        );
    };
}

export default CreateBio