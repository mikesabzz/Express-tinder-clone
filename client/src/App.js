import React from 'react';
import { Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import Signup from './components/Signup'
import  ProtectedRoute from './components/ProtectedRoute'
import { login, getProfile, signUp } from './services/apiService'
import './App.css';
import authService from './services/authService';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {}
    }
  }

  async componentDidMount() {
    try{
      const fetchUser = await getProfile()

      this.setState(state => {
        return {
          isSignedIn: authService.isAuthenticated(),
          user: fetchUser
        }
      })
    } catch(e) {
      throw e
    }
  }

loginUser = async (credentials) => {
  try {
    const user = await login(credentials)
    this.setState(state => {
      return {
        isSignedIn: true,
        user: user
      }
    })
  }
  catch (e) {
    throw e
  }
}


signOutUser = () => {
  authService.signOut()

  this.setState(state => {
    return {
      isSignedIn: false,
      user: {}
    }
  })
}

signUpUser = async (credentials) => {
  
  try {
    await signUp(credentials)
    const newUser = {email: credentials.email, password: credentials.password}
    this.loginUser(newUser)
  } catch (e) {
    throw e
  }
}

  render() {
    const { isSignedIn , user} = this.state
    return (
      <div className="App">
        <nav>
          {
            isSignedIn &&
            <div className="dashboard-button">
              <Link to="/dashboard">Dashboard</Link>
            </div>

          }
          {
            !isSignedIn ? (
              <div className="login-button"><Link to="/login">Login</Link></div>
            ) : (
              <div className="signoff-button"><button onClick={this.signOutUser}>Sign Off</button></div>
            )
          
          }

        
          {!isSignedIn ? (
              <div className="signup-button"><Link to="/signup">Sign up</Link></div>
            ) : (
              null
            )
          }

        </nav>
        <div>
        {!isSignedIn ? (
            <div>
              <h1 className="title">Friendly Tinder</h1>
              <br></br>
              <h2 className="greeting">Meet New Friends Near You</h2>
            </div>
          ) : (
              null
            )
          }
        </div>
  
        <main>
          <ProtectedRoute 
            path="/dashboard" 
            user={user}
            component={Dashboard} 
          />
          <Route 
            path="/login"
            render={(props) => <Login  {...props} handleLogin={this.loginUser} isSignedIn={isSignedIn}/>} 
          />
          <Route 
            path='/signup' 
            render = {(props) => <Signup {...props} handleSignUp={this.signUpUser} isSignedIn={isSignedIn} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
