import React from 'react';
import { Link } from 'react-router-dom';
import { 
    getProfile,
    getDemoUser, 
    getMaleUsers, 
    getFemaleUsers 
} from '../../services/apiService';
import './UserList.css';

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            bios:{},
            currentUser:[],
            males:[],
            females:[]
        }
    }
    async componentDidMount () {
        await this.getDemo() 
        await this.getMale()
        await this.getFemale()
        await this.fetchCurrentUser()
    }
    fetchCurrentUser = async () => {
        const currentUser = await getProfile()
        this.setState({currentUser})
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
    renderUserProfile = () => {
        const userId = localStorage.getItem('userId')
        return this.state.data.filter(user => user.id == userId)
            .map(username => {
                return (
                    <div key={username.id}><Link className="button" to={{
                        pathname: `/dashboard/bio/${username.id}`,
                        state: { 
                            bios: username.bio, 
                            name: username.name
                        }
                    }}>{username.name}</Link></div>
                )
            })
    }
    renderUsers = () => {
        const genderInterest = this.state.currentUser
        if (genderInterest){
            return genderInterest.map(interest => {
                if (interest.bio.gender_preference == 'men') {
                    return this.state.males.map(male => {
                        return (
                            <div key={male.id}>
                                <img className="users-image" src={male.bio.image} alt="no img" />
                                <h2 key={male.id}><Link className="peoples-list" to={{
                                    pathname: `/dashboard/bio/${male.id}`,
                                    state: {
                                        bios: male.bio,
                                        name: male.name
                                    }
                                }}>{male.name}</Link></h2>
                            </div>
                        )
                    })
                } 
                else if (interest.bio.gender_preference == 'women') {
                    return this.state.females.map(female => {
                        return (
                            <div key={female.id}>
                                <img className="users-image" src={female.bio.image} alt="no img" />
                                <h2 key={female.id}><Link className="peoples-list" to={{
                                    pathname: `/dashboard/bio/${female.id}`,
                                    state: {
                                        bios: female.bio,
                                        name: female.name
                                    }
                                }}>{female.name}</Link></h2>
                            </div>
                        )
                    })
                } else {
                    return this.state.data.map(user => {
                        return (
                            <div key={user.id}>
                                <img className="users-image" src={user.bio.image} alt="no img" />
                                <h2 key={user.id}><Link className="peoples-list" to={{
                                    pathname: `/dashboard/bio/${user.id}`,
                                    state: {
                                        bios: user.bio,
                                        name: user.name
                                    }
                                }}>{user.name}</Link></h2>
                            </div>
                        )
                    })

                }
            })
        }
    }
    render() {
        return (
            <div className="dashboard">
                <h1>Welcome to Tinder Friendly</h1>
                <h3>Find out whos near you</h3>
                <div>{this.renderUserProfile()}</div>
                <div className="people-list">{this.renderUsers()}</div>
            </div>
        )
    }
}
export default UserList