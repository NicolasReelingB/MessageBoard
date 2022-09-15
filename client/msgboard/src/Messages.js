import React, { useState, useEffect } from "react";
import "./Messages.css";
import axios from "axios"
import MsgCard from "./Components/MsgCard";
import { Col } from "react-bootstrap";

const Messages = () => {
  const [items, setItems] = useState([]);
  const [categories, setCat] = useState([]);
  const [catChose, setChosen] = useState(0);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  
  async function getData() {
    await axios.get('http://127.0.0.1:8000/messages/')
      .then(res => {
        setItems(res.data)
      });
     await axios.get('http://127.0.0.1:8000/categories/').then((res) => {
      setCat(res.data);
      console.log(res.data);
    });
  }

  /*const chooseMsgs = event => {
    setCat(event.target.value);
  {catChose === 0 ? (
    getData()
  ): (
      axios.get('http://127.0.0.1:8000/category/' + 3 + "/").then((res) => {
      console.log(res.data);
      setItems(res.data);
      })
    )}
  }; */

  /*<div className="inputGroup">
        <select value={catChose} onChange={chooseMsgs}>
          <option value = "0"> Todos</option>  
          {categories.map((categoria) => <option key = {categoria.pk} value = {categoria.pk}>{categoria.name}</option>)}
        </select>
        </div>*/

  useEffect(() => {
    getData();
  }, []);

  return (
      <div id="msg_container">
        {items.map((item) => {
          return (
            <Col key = {item.pk}>
                <MsgCard className="card"
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