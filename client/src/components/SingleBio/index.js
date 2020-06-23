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
    const bios = props.location.state.bios
      return (
        <div className="single-bio">
          <div key={bios.id}>
            <img alt="" src={bios.image} /> 
            <h2>{props.location.state.name}</h2>
            <p>{bios.bio}</p> 
            <p>Gender: {props.location.state.gender}</p>
            <p>Interests: {props.location.state.gender_preference}</p>
            <p>Located: {bios.location}</p>
          </div>
          {localStorage.getItem('userId') == props.match.params.id ?
          (<div>
            <button className="update-button" onClick={()=> props.history.push('/dashboard/bio/:bio_id/update', {bioId: bios.id})}><img src="https://www.shareicon.net/data/512x512/2015/12/19/689669_arrows_512x512.png" alt=""></img></button>
          <br />
            <button className="delete-button" onClick={() => handleDelete(bios.id)}><img src="https://pngimage.net/wp-content/uploads/2018/05/delete-symbol-png-8.png" alt=""></img></ button>
          </div>
          ) : (
            <div></div>
          )   
          }       
        </div>
      )
  }
}
    return (
      <div>
       {renderBios()}
      </div>
    );
  }


export default SingleBio;