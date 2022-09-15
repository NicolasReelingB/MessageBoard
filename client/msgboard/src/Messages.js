import React, { useState, useEffect } from "react";
import "./Messages.css";
import axios from "axios"
import MsgCard from "./Components/MsgCard";
import { Col } from "react-bootstrap";

const Messages = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
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

      <div className="weather-container">
        <input className="locationInput"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
          
          <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null} <p> Humidity</p>
            </div>
          </div>
        }
      </div>

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