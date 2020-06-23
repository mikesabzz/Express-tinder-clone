import React from 'react';
import { Route, Link } from 'react-router-dom';
import { 
    getDemoUser, 
    getNewUser, 
    getMaleUsers, 
    getFemaleUsers 
} from '../../services/apiService';
import './UserList.css';


class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            bios:[],
            males:[],
            females:[]
        }
    }

    async componentDidMount () {
        await this.getDemo() 
        await this.getMale()
        await this.getFemale()
    }

    getDemo = async () => {
        const data = await getDemoUser()
        this.setState({data})
    }
    getMale = async () => {
        const males = await getMaleUsers()
        this.setState({males})
    }
    getFemale = async () => {
        const females = await getFemaleUsers()
        this.setState({females})
    }

    renderMale = () => {
        if(this.state.males) {
            return this.state.males.map(male => {
                return (
                    <h2 key={male.id}><Link className="peoples-list" to={{
                        pathname: `/dashboard/bio/${male.id}`,
                        state: { 
                            bios: male.bios, 
                            gender: male.gender, 
                            gender_preference: male.gender_preference
                        }
                    }}>{male.name}</Link></h2>
                )
            })
        }
    }
    renderFemale = () => {
        if(this.state.females) {
            return this.state.females.map(females => {
                return (
                    <h2 key={females.id}><Link className="peoples-list" to={{
                        pathname: `/dashboard/bio/${females.id}`,
                        state: { 
                            bios: females.bios, 
                            gender: females.gender, 
                            gender_preference: females.gender_preference
                        }
                    }}>{females.name}</Link></h2>
                )
            })
        }
    }
    renderAll = () => {
        if (this.state.data) {
            return this.state.data.map(user => {
                return (
                    <h2 key={user.id}><Link className="peoples-list" to={{
                        pathname: `/dashboard/bio/${user.id}`,
                        state: { 
                            bios: user.bios, 
                            gender: user.gender, 
                            gender_preference: user.gender_preference
                        }
                    }}>{user.name}</Link></h2>
                )
            })
        }
    }

    render() {
        console.log('username', this.props.user)
        return (
            <div className="dashboard">
                <h1>Welcome to Tinder Friendly</h1>
                <h3>Find out whos near you</h3>
                <div className='button'>
                    <Link className="create-bio-button" to='/dashboard/create'>Create Your Profile</Link>
                </div>
                { (this.props.user.gender_preference == 'men') ? 
                <div className="people-list">{this.renderMale()}</div> :
                (this.props.user.gender_preference == 'women') ?
                <div className="people-list">{this.renderFemale()}</div> :
                <div className="people-list">{this.renderAll()}</div>
                }
            </div>
        )
    }
}
export default UserList