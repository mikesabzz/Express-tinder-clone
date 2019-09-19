import React from 'react'
import LoginForm from './LoginForm'
import './Login.css'

function Login(props) {
    return(
        <div className="login">
            <LoginForm {...props} />
        </div>
    )
}


export default Login