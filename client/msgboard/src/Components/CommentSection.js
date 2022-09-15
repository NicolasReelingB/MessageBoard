import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Profile.css';
import { Col } from "react-bootstrap";
import MsgCard from "./MsgCard";

const CommentSection = (id) => {
    const [comment, setComment] = useState("");
    const [items, setItems] = useState([]);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || []
    );
    console.log(id);
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/message/" + 5 + "comment/", {
            headers: {
                'Authorization': `Token ${token.data.token}`,
            }
        }).then((response) => {
            setItems(response.data)
        })
    }, [])

    const newComment = () => {
        axios.post("http://127.0.0.1:8000/message/" + 5 + "/comment/", {
            comment: comment
        },
        {
          headers: {
              'Authorization': `Token ${token.data.token}`,
            }
        }).then(((response) => {console.log(response)}));
    }
    return (
        <div className="entriesContainer">
         <br></br>
         <br></br>
         <br></br>
         <br></br>   
            <input 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
        />
        <br></br>
        <button onClick={newComment}>ENTER</button>
            {items.map((item) => {
                return (
                    <Col key = {item.pk}>
                        <MsgCard
                            title={item.title}
                            content={item.content}
                            author={item.author_username}
                            pub_date={item.pub_date}
                            pk={item.pk}
                        />
                    </Col>
                );
        })} 
        </div>
    );
}

export default CommentSection;