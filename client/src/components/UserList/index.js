import React from 'react';
import { Route, Link } from 'react-router-dom';
import { 
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
                console.log(male)
                return (
                    <div>
                        <img className="users-image" src={male.bio.image} alt="no img" />
                        <h2 key={male.id}><Link className="peoples-list" to={{
                            pathname: `/dashboard/bio/${male.id}`,
                            state: { 
                                bios: male.bio, 
                                gender: male.gender, 
                                gender_preference: male.gender_preference,
                                name: male.name
                            }
                        }}>{male.name}</Link></h2>
                    </div>
                )
            })
        }
    }
    renderFemale = () => {
        if(this.state.females) {
            return this.state.females.map(female => {
                return (
                    <div>
                        <img className="users-image" src={female.bio.image} alt="no img" />
                        <h2 key={female.id}><Link className="peoples-list" to={{
                            pathname: `/dashboard/bio/${female.id}`,
                            state: {
                                bios: female.bio,
                                gender: female.gender,
                                gender_preference: female.gender_preference,
                                name: female.name
                            }
                        }}>{female.name}</Link></h2>
                    </div>
                )
            })
        }
    }
    renderAll = () => {
        if (this.state.data) {
            return this.state.data.map(user => {
                return (
                    <div>
                        {/* <img className="users-image" src={user.bio.image} alt="no img" /> */}
                        <h2 key={user.id}><Link className="peoples-list" to={{
                            pathname: `/dashboard/bio/${user.id}`,
                            state: {
                                bios: user.bio,
                                gender: user.gender,
                                gender_preference: user.gender_preference,
                                name: user.name
                            }
                        }}>{user.name}</Link></h2>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div className="dashboard">
                <h1>{`Whats up, ${this.props.user.name}`}</h1>
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