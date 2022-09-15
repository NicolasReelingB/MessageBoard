import React, { useState, useEffect } from "react";
import "./Messages.css";
import axios from "axios"
import MsgCard from "./Components/MsgCard";
import { Col } from "react-bootstrap";

const Messages = () => {
  const [items, setItems] = useState([]);
  
  async function getData() {
    axios.get('http://127.0.0.1:8000/messages/')
      .then(res => {
        setItems(res.data)
        console.log(items);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
      <div id="msg_container">
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

export default Messages;