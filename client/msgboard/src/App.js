import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const current= new Date()
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  const newitem = () => {
    if (item.trim() !== "") {
      const newitem = {
        id: uuidv4(),
        item: item,
        title: title,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: { x: 100, y: 0 },
        fecha: date,
      };
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

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <div id="new-item">
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa titulo"
        />
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Contenido..."
          onKeyPress={(e) => keyPress(e)}
        />
        <button onClick={newitem}>ENTER</button>
      </div>
      <div id="msg_container">
        {items.map((item, index) => {
          return (
              <div style={{backgroundColor: item.color}} class = "msg_section">
                <div class = "msg_head">
                  <div class = "msg_person">
                    Nico
                  </div>
                  <div class = "msg_title">
                    {item.title}
                  </div>
                  <button id="delete" onClick={(e) => deleteNote(item.id)}>
                  X
                </button>
                  <div class = "msg_time">
                    {item.fecha}
                  </div>
                </div>
                <p class = "msg_content"> {item.item}</p>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;