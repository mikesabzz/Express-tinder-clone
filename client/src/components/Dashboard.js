import React from 'react'
import { Route, Switch } from 'react-router-dom';

import CreateBio from './CreateBio'
import UserList from './UserList';
import SingleBio from './SingleBio';
import UpdateBio from './UpdateBio';



class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bios: []
        }
    }

    render() {
        const { user } = this.props
        console.log("user", user)
        return( 
            <div className="bio">
                <h1>{`Whats up, ${user.name}`}</h1>
                <Switch>
                    <Route exact path="/dashboard/" component={UserList} />
                    <Route exact path='/dashboard/bio/:id' render={(props)=> <SingleBio {...props}/>}/>
                    <Route exact path="/dashboard/create" render={(props) => <CreateBio {...props} user={user} />} />
                    <Route exact path='/dashboard/bio/:bio_id/update' render={(props) => <UpdateBio {...props}/>}/>
                </Switch>
            </div>
        )
    }
}


export default Dashboard