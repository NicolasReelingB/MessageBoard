import Card from 'react-bootstrap/Card';

const MsgCard = (props) => {
  return (
    <Card>
      <Card.Header><card-title>{props.title} </card-title>{props.pub_date}</Card.Header>
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