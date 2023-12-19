import React from 'react'
import {Redirect} from 'react-router-dom'
import './Login.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            email: "",
            password: "",
            showError: false,
            loading: false
        }
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)
    }

handleSubmitForm = async (event) => {
    event.preventDefault()
    const { email, password } = this.state
    const { handleLogin } = this.props

    this.setState({ loading: true })
    try {
        await handleLogin({ email, password})
    } catch(e) {
        this.setState(state => {
            return { showError: true }
        })
    }
}

handleTextInput = (event) => {
    const { name, value }= event.target

    this.setState(state => {
        return { [name] : value}
    })
}
    render() {
        const { isSignedIn} = this.props
        const { showError, loading } = this.state

        let errorMessage
        let loadingMessage

        if(showError) {
            errorMessage = (
                <div className="errorMessage">
                    <span>An error occured, please try again</span>
                </div>
            )
        } 
        if (loading) {
            loadingMessage = (
            <div className="loadingMessage">
                    <span></span>
                </div>
            )
        }
        if (isSignedIn) {
            return <Redirect to="/dashboard" />
        }
        return( 
            <div className="login-form">
                <h1>Login</h1>
                { errorMessage }
                { loadingMessage }
                <form className="form" onSubmit={this.handleSubmitForm}>
                    <div>
                        <label>Email</label>
                        <input
                        type="text"
                        name="email"
                        onChange={this.handleTextInput}
                        value={this.state.email}
                         />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                        type="password"
                        name="password"
                        onChange={this.handleTextInput}
                        value={this.state.password}
                         />
                    </div>
                    <button disabled={true}>Login</button>
                </form>
            </div>
            )
    }

}


export default LoginForm