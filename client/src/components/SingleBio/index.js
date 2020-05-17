import React from 'react';
import './SingleBio.css';
import {deleteBio} from '../../services/apiService';

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
          <div key={bio.id}>
            <img alt="" src={bio.image} /> 
            <p>{bio.bio}</p> 
            <p>Gender: {bio.gender}</p>
            <p>Interests: {bio.gender_preference}</p>
            <p>Located: {bio.location}</p>
          </div>
          {localStorage.getItem('userId') == props.match.params.id ?
          (<div>
            <button className="update-button" onClick={()=> props.history.push('/dashboard/bio/:bio_id/update', {bioId: bio.id})}><img src="https://www.shareicon.net/data/512x512/2015/12/19/689669_arrows_512x512.png" alt=""></img></button>
          <br />
            <button className="delete-button" onClick={() => handleDelete(bio.id)}><img src="https://pngimage.net/wp-content/uploads/2018/05/delete-symbol-png-8.png" alt=""></img></ button>
          </div>
          ) : (
            <div></div>
          )   
          }       
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