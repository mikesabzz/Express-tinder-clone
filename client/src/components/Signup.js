import React from 'react'
import SignUpForm from './SignUpForm'
import './Signup.css'


function Signup(props) {
    return(
        <div className="signup">
            <SignUpForm {...props} />
        </div>
    )
}


export default Signup