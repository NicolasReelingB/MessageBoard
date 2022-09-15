import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios"

const MsgPosting = () =>{
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCat] = useState([]);
  const [catChose, setChosen] = useState(0);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  
  async function newitem() {
      axios.post("http://127.0.0.1:8000/messages/", 
        {
          title: title,
          category: catChose,
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

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/categories/').then((res) => {
      setCat(res.data);
    });
  }, [])

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
        <select onChange={(e) => {
          setChosen(e.target.value);
          console.log(catChose);
          }}>
        {categories.map((categoria) => <option key = {categoria.pk} value = {categoria.pk}>{categoria.name}</option>)}
        </select>
        <br></br>
        <button onClick={newitem}>ENTER</button>
      </div>
  );
}

export default MsgPosting;