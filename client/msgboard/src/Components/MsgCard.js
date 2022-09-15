import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import axios from "axios"

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
    navigate('/comments', {id: props.pk});
  }

  return (
    <Card>
      <Card.Header as="h5">{props.title} {props.pub_date} <Button onClick={()=>deleteMsg(props.pk)}></Button></Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {props.content}{' '}
          </p>
          <footer className="blockquote-footer">
            {props.author} <cite title="Source Title"></cite> <Button onClick={()=>likeMsg(props.pk)}></Button> <Button onClick={()=>navigateToComments(props.pk)}></Button>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default MsgCard;