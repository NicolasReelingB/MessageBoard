import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"
import { Container, Form } from "react-bootstrap";

const MsgPosting = () =>{
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCat] = useState([]);
  
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/categories/').then((res) => {setCat(res)});
        console.log(categories);
    }, []);

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
    <p>asdadasads</p>
  );
}

export default MsgPosting;