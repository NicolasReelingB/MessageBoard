import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MsgPosting.css"
import axios from "axios"

const UpdateMessage = () =>{
    const location = useLocation();
    const id = location.state.id;
    const navigate = useNavigate();
  const [item, setItem] = useState(location.state.content);
  const [title, setTitle] = useState(location.state.title);
  const [categories, setCat] = useState([]);
  const [catChose, setChosen] = useState(location.state.category);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  
  async function updateItem() {
    const urlGet = "http://127.0.0.1:8000/message/" + id + "/";
      axios.put(urlGet, 
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
      navigate('/messages');
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
      setItem("");
      setTitle("");
  };

  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      updateItem();
    }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/categories/').then((res) => {
      setCat(res.data);
    });
  }, [])

  return (
    <div id="new-item">
      <div className="inputGroup">
        <input className="inputField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
      </div>
      <div className="inputGroup">
        <input id="contentField" className="inputField"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Content..."
          onKeyPress={(e) => keyPress(e)}
        />
        <div className="inputGroup">
        <select value ={catChose} className="categoriesSelect" onChange={(e) => {
          setChosen(e.target.value);
          }}>
        {categories.map((categoria) => <option key = {categoria.pk} value = {categoria.pk}>{categoria.name}</option>)}
        </select>
        
        <div className="enterContainer">
        <button className="enter" onClick={updateItem}>UPDATE</button>
        </div>
        </div>
    </div>
    </div>
  );
}

export default UpdateMessage;