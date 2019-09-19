import React from 'react';
import { Redirect } from 'react-router-dom';
import { updateBio } from '../../services/apiService'
import Axios from 'axios';
import './UpdateBio.css'


class UpdateBio extends React.Component {
    constructor(props) {
        super(props)

        this.props = props
        this.state = {
            updated: false
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
        const bios = { userId, name, bio };
        const id = this.props.location.state.bioId
        await updateBio(id, bios);

        this.setState({ updated: true })
    }


    render() {
        if (this.state.updated) { return <Redirect to="/dashboard"></Redirect> }
        return (
            <div className="update-bios">
                <h1>Update Your Bio:</h1>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <label for="bio">Bio:</label>
                    <input name="bio" type="text" />
                </form>
            </div>
        );
    };
}

export default UpdateBio