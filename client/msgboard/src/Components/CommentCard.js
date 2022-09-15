import React, {useState} from 'react';
import {Card} from 'react-bootstrap';

const CommentCard = (props) => {
  return (
    <Card>
      <Card.Header as="h5">{props.title} {props.pub_date}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {props.content}{' '}
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default CommentCard;