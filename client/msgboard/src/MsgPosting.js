import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"

const MsgPosting = () =>{
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  
  const newitem = () => {
    if (item.trim() !== "") {
      const newitem = {
        id: uuidv4(),
        item: item,
        title: title,
      };
      axios.post('http://127.0.0.1:8000/messages/', {
        title: newitem.title,
        author: "Nicolas",
        category: 1,
        content: newitem.item
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      setItems((items) => [...items, newitem]);
      setItem("");
      setTitle("");
    } else {
      alert("Enter a item");
      setItem("");
      setTitle("");
    }
  };

  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

  return (
    <div id="new-item">
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