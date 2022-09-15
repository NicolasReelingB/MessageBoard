import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import "./MsgCard.css"

const MsgCard = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );

  const deleteMsg = (id) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      const apiCall = "http://127.0.0.1:8000/message/" + id + "/";
      axios.delete(apiCall, {
        headers: {
          'Authorization': `Token ${token.data.token}`,
        }
      }).then(() => console.log("Se ha borrado exitosamente."));
    }
  };

  const likeMsg = (id) => {
    const apiCall = "http://127.0.0.1:8000/message/" + id + "/like/";
    axios.post(apiCall, {
      headers: {
        'Authorization': `Token ${token.data.token}`,
      }
    }).then(() => console.log("Liked!"));
  }

  const navigateToComments = () => {
    navigate('/comments', {state:{id:props.pk}});
  }

  return (
    <Card>
      <Card.Header>
      
      <div class="title"> 
        <h5>{props.title} </h5>
      </div>
      
      <div class="datePub"> 
        <h5>{props.pub_date} </h5>
      </div>
      
      <button className="buttons" onClick={()=>deleteMsg(props.pk)}><FontAwesomeIcon icon={faDeleteLeft}/></button>
      <button className="buttons" ><FontAwesomeIcon icon={faEdit}/></button>
      
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {props.content}{' '}
          </p>
          <footer className="blockquote-footer">
            {props.author} <cite title="Source Title"></cite> 
              <button className="buttons" onClick={()=>likeMsg(props.pk)}><FontAwesomeIcon icon={faHeart} id="heartIcon" className="buttonIcons" /></button> 
              <button className="buttons" onClick={()=>navigateToComments(props.pk)}><FontAwesomeIcon icon={faComment} className="buttonIcons" /></button>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default MsgCard;