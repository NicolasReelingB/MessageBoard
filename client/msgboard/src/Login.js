import React, { useState, useEffect } from "react";
import axios from "axios"
import './Login.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const Login = () => {
  const [userName, setUser] = useState("");
  const [password, setPW] = useState("");  
    const clientId = '483228021662-givrndsnnso527e6b1jkkkkl2udult6d.apps.googleusercontent.com'


  const logUser = () => {
    axios.post('http://127.0.0.1:8000/user/obtain-token/', {
      username: userName,
      password: password
    })
    .then((response) => {
      localStorage.setItem("token", JSON.stringify(response));
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  return (
      <body>
    <section className="Form my-4 mx-5">
        <div className="container">
            <div className="row no-gutters">
                <div className="col-lg-7 px-5 pt-5">
                    <h1 className="font-weight-bold py-3">Sign into your account!</h1>
                    <form>
                        <div className="form-row">
                            <div>
                                <input type="username" placeholder="Username" className="form-control my-3 p-4" value = {userName} onChange={(e) => setUser(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <input type="password" placeholder="Password" className="form-control my-3 p-4" value = {password} onChange={(e) => setPW(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="form-button">
                            <div className="col-lg-8">
                                <button type="button" className="button1" onClick={() => logUser()}>Sign in</button>
                            </div>
                        </div>
                        <p>Don't have an account? <a href="/">Sign up here</a></p>
                        <GoogleLogin
                          clientId={clientId}
                          buttonText='Sign in with Google'
                          onSuccess={onSuccess}
                          onFailure={onFailure}
                          cookiePolicy={'single_host_origin'}
                          isSignedIn={true}
                        />
                    </form>
                </div>
            </div>
        </div>
    </section>
  </body>
  );
}

export default Login;