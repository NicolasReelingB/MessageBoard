import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"
import MsgCard from "./Components/MsgCard";
import { Col } from "react-bootstrap";

const Messages = () => {
  const [items, setItems] = useState([]);
  
  async function getData() {
    axios.get('http://127.0.0.1:8000/messages/')
      .then(res => {
        setItems(res.data)
      })
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
      <div className="App">
      <div id="msg_container">
        {items.map((item) => {
          return (
            <Col key = {item.pk}>
                <MsgCard
                    title={item.title}
                    content={item.content}
                    author={item.author}
                    pub_date={item.pub_date}
                />
            </Col>
          );
        })}
      </div>
    </div>
  );
}

export default Messages;