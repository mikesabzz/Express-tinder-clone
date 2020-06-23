import React from 'react';
import { Link } from 'react-router-dom';
import { 
    getDemoUser, 
    getMaleUsers, 
    getFemaleUsers 
} from '../../services/apiService';
import './UserList.css';
import { use } from 'passport';


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
    }
    renderFemale = () => {
        if(this.state.females) {
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
        }
    }
    renderAll = () => {
        if (this.state.data) {
            return this.state.data.map(user => {
                const image = typeof (user.bio) === null ? "No Image" : user.bio
                return (
                    <div key={user.id}>
                        <img className="users-image" src={image} alt="no img" />
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
    }

    render() {
        const name = typeof (this.props.user[0]) === 'undefined' ? "loading..." : this.props.user[0].name
        const genderInterest = (this.props.user[0]) == null ? "loading..." : this.props.user[0].bio.gender_preference
        // const createProfle = (this.props.user[0]) === null ? "loading..." : this.props.user[0].bio
        return (
            <div className="dashboard">
                <h1>{`Whats up, ${name}`}</h1>
                <h1>Welcome to Tinder Friendly</h1>
                <h3>Find out whos near you</h3>
                {typeof createProfle === 'undefined' ?            
                <div className='button'>
                    <Link className="create-bio-button" to='/dashboard/create'>Create Your Profile</Link>
                </div> : ""
                }
                { 
                (genderInterest == 'men') ? 
                <div className="people-list">{this.renderMale()}</div> :
                (genderInterest == 'women') ?
                <div className="people-list">{this.renderFemale()}</div> :
                <div className="people-list">{this.renderAll()}</div>
                }
            </div>
        )
    }
}
export default UserList