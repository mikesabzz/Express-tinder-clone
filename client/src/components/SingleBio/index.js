import React from 'react';
import './SingleBio.css';
import {deleteBio} from '../../services/apiService';
import { Redirect } from 'react-router-dom';

const  SingleBio = (props) =>  {

  const handleDelete = async (id) => {
    await deleteBio(id);
    await props.history.push(`/dashboard`)
  }

const renderBios = () => {

  if(props.location.state){
    return props.location.state.bios.map(bio => {
      return (
        <div className="single-bio">
          <div key={bio.id}>{bio.bio}
          </div>
          <div>
            <button className="update-button" onClick={()=> props.history.push('/dashboard/bio/:bio_id/update', {bioId: bio.id})}>Update</button>
          </div>
          <br />
          <div>
            <button className="delete-button" onClick={() => handleDelete(bio.id)}>Delete</ button>
          </div>
        </div>
      )
    })
  }
}
    return (
      <div>
       {renderBios()}
      </div>
    );
  }


export default SingleBio;