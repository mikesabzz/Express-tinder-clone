import React from 'react';
import { Link } from 'react-router-dom';
import './SingleBio.css';

const  SingleBio = (props) =>  {

const renderBios = () => {

  if(props.location.state){
    const bios = props.location.state.bios
    if (typeof bios == 'undefined') {
      return (
      <div className='button'>
        <Link className="create-bio-button" to='/dashboard/create'>Create Your Profile</Link>
      </div>
      )
    } else {
      return (
        <div className="single-bio">
          <div key={bios.id}>
            <img alt="" src={bios.image} /> 
            <h2>{props.location.state.name}</h2>
            <p>{bios.bio}</p> 
            <p>Gender: {bios.gender}</p>
            <p>Interests: {bios.gender_preference}</p>
            <p>Located: {bios.location}</p>
          </div>
          {localStorage.getItem('userId') == props.match.params.id ?
          (<div>
            <button 
              className="update-button" 
              onClick={()=> props.history.push('/dashboard/bio/:bio_id/update', 
                {bioId: bios.id, image: bios.image, bio: bios.bio, gender: bios.gender, interest: bios.gender_preference, location: bios.location}, 
                )}>
                <img src="https://www.shareicon.net/data/512x512/2015/12/19/689669_arrows_512x512.png" alt=""></img>
            </button>
          </div>
          ) : (
            <div></div>
          )   
          }       
        </div>
      )
    }
  }
}
    return (
      <div>
       {renderBios()}
      </div>
    );
  }


export default SingleBio;