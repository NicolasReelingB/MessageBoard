import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [password, setPW] = useState("");  
  const clientId = '483228021662-givrndsnnso527e6b1jkkkkl2udult6d.apps.googleusercontent.com'


  const createAccount = () => {
    axios.post('http://127.0.0.1:8000/users/', {
        username: userName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password

    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
    navigate('/login', {state:{username:userName}});
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
        <section className='Form my-4 mx-5'>
          <div className='container'>
            <div className='row no-gutters'>
              <div className='col-lg-7 px-5 pt-5'>
                <h1 className='font-weight-bold py-3'>Create an account!</h1>
                <form>
                <div className='form-row'>
                    <div>
                      <input type='text' placeholder='Username' className='form-control my-3 p-4' value = {userName} onChange={(e) => setUser(e.target.value)}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div>
                      <input type='e-mail' placeholder='E-mail' className='form-control my-3 p-4' value = {email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div>
                      <input type='text' placeholder='First Name' className='form-control my-3 p-4' value = {firstName} onChange={(e) => setFirst(e.target.value)}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div>
                      <input type='text' placeholder='Last Name' className='form-control my-3 p-4' value = {lastName} onChange={(e) => setLast(e.target.value)}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div>
                      <input type='password' placeholder='Password' className='form-control my-3 p-4' value = {password} onChange={(e) => setPW(e.target.value)}></input>
                    </div>
                  </div>
                  <div className='form-button'>
                    <div className='col-lg-8'>
                      <button type='button' className='button1' onClick={() => createAccount()}>Sign Up</button>
                    </div>
                  </div>
                  <p>Already have an account? <a href="/login">Log In!</a></p>
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
  );
}

export default SignUp;