import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './Signup.css'

class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            showError: false
        }
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)
    }

    handleSubmitForm = async (e) => {
        e.preventDefault()
        const { 
            name, 
            email, 
            password, 
        } = this.state
        const  { handleSignUp } = this.props;
        try {
            await handleSignUp({name, email, password})
        } catch(e) {
            this.setState({ showError : true })
        }
    }

    handleTextInput = (e) => {
        const { name, value } = e.target
        const lowercasedName = name === "email" ? value.toLowerCase() : value;
        this.setState(state => {
            return { [name] : lowercasedName}
        })
    }

    render() {
        const { isSignedIn } = this.props
        if (isSignedIn) {
            return <Redirect to="/dashboard/create" />
        }

        return(
            <div>
                <h1 className="sign-form-title">Sign Up</h1>
                <form className="sign-up-form" onSubmit={this.handleSubmitForm}>
                    <div>
                        <label>Name</label>
                        <input 
                        type="text" 
                        name='name'
                        onChange={this.handleTextInput}
                        value ={this.state.name}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input 
                        type="text" 
                        name="email"
                        onChange={this.handleTextInput}
                        value={this.state.email}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        name="password"
                        onChange={this.handleTextInput}
                        value={this.state.password} />
                    </div>
                    <button className="sign-up-button">Sign up</button>
                </form>
            </div>
        )
    }
}


export default  SignUpForm 