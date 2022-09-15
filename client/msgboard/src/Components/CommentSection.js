import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Profile.css';
import { Col, Card } from "react-bootstrap";
import CommentCard from "./CommentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CommentSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const [msgTitle, setTitle] = useState("");
    const [msgDate, setMsgDate] = useState("");
    const [msgContent, setMsgContent] = useState("");
    const [msgAuthor, setMsgAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [items, setItems] = useState([]);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || []
    );
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/message/" + id + "/comment/", {
            headers: {
                'Authorization': `Token ${token.data.token}`,
            }
        }).then((response) => {
            setItems(response.data)
        })
        actualMessage();
    }, [])

    const newComment = () => {
        axios.post("http://127.0.0.1:8000/message/" + id + "/comment/", {
            comment: comment
        },
        {
          headers: {
              'Authorization': `Token ${token.data.token}`,
            }
        }).then(((response) => {console.log(response); window.location.reload(true);}));
    }

    const actualMessage = () => {
        axios.get("http://127.0.0.1:8000/message/" + id + "/",
        {
          headers: {
              'Authorization': `Token ${token.data.token}`,
            }
        }).then(((response) => {
            console.log(response);
            setTitle(response.data.title);
            setMsgAuthor(response.data.author_name);
            setMsgContent(response.data.content);
            setMsgDate(response.data.pub_date)
        }));
    }
    return (
        <div className="entriesContainer">
         <br></br> 
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button className="buttons" onClick={()=>navigate("/messages")}><FontAwesomeIcon icon={faArrowLeft} id="faArrowLeft" className="buttonIcons" /></button>
            </div>  
         <br></br>
         <br></br>
         <div className="commentInputContainer">   
            <input className="commentInput"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
        />
        </div>
        <button className="enter" onClick={newComment}>ENTER</button>
        <Card>
            <Card.Header as="h5">{msgTitle} {msgDate}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        {msgContent}{' '}
                    </p>
                    <footer className="blockquote-footer">
                        {msgAuthor} <cite title="Source Title"></cite> 
                    </footer>
                    </blockquote>
                </Card.Body>
    </Card>
            {items.map((item) => {
                return (
                    <Col key = {item.pk}>
                        <CommentCard
                            title={item.user_username}
                            content={item.comment}
                            pub_date={item.pub_date}
                        />
                    </Col>
                );
        })} 
        </div>
    );
}

export default CommentSection;