import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios"

const MsgPosting = () =>{
  const [categories, setCat] = useState([]);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  
  async function newitem() {
      axios.post("http://127.0.0.1:8000/messages/", 
        {
          title: title,
          category: 1,
          content: item
        },
        {
          headers: {
              'Authorization': `Token ${token.data.token}`,
            }
        }
    ).then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
      setItems((items) => [...items, newitem]);
      setItem("");
      setTitle("");
  };

  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

  return (
    <div id="new-item">
      <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa titulo"
        />
        <br></br>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Contenido..."
          onKeyPress={(e) => keyPress(e)}
        />
        <br></br>
        <button onClick={newitem}>ENTER</button>
      </div>
  );
}

export default MsgPosting;