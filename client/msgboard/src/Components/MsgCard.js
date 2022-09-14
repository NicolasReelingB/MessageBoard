import {Card, Button} from 'react-bootstrap';
import axios from "axios"

const MsgCard = (props) => {

  const deleteMsg = (id) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      const apiCall = "http://127.0.0.1:8000/message/" + id + "/";
      axios.delete(apiCall).then(() => console.log("Se ha borrado exitosamente."));
    }
  };

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
            {props.author} <cite title="Source Title"></cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default MsgCard;