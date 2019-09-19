import React from 'react';
import { Route, Link } from 'react-router-dom';
import { getDemoUser } from '../../services/apiService';
import { getNormalPerson } from '../../services/apiService';
import './UserList.css';


class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            bios:[]
        }
    }

    async componentDidMount () {
        await this.getDemo() 
        await this.getNormal ()
    }

    getDemo = async () => {
        const data = await getDemoUser()
        this.setState({data})
    }

    getNormal = async () => {
        const data = await getNormalPerson()
        this.setState({data})
        
    }

    renderPerson= () => {
        if(this.state.data){
            return this.state.data.map(user =>{
                
                return (
                    <h2 key={user.id}><Link className ="peoples-list" to={{
                        pathname:`/dashboard/bio/${user.id}`,
                        state:{bios:user.bios}
                }}>{user.name}</Link></h2>
                )
            })
        }
    }

    renderNormalPerson= () => {
       
        if(this.state.data){
            return this.state.data.map(user =>{
                console.log('rendernormalperson',user)
                // console.log(this.state)
                console.log('RNP props',this.props)
                return (
                    <li key={user.id}><Link to={{
                        pathname:`/dashboard/bio/${user.id}`,
                        state:{bios:user.bios}
                }}>{user.name}</Link></li>
                )
            })
        }
    }

    render() {
        return( 
        <div>
            <h1>Welcome to Tinder</h1>
                <div className="people-list">
                    
                        {this.renderPerson()}
                    
                </div>
                <div className= 'button-div'>
                    <Link className= "create-bio-button" to='/dashboard/create'>Create New Bio</Link>
                </div>
            
        </div>
        )
    }
}

export default UserList