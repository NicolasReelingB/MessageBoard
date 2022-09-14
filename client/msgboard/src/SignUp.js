import React, { useEffect } from "react";
import Navigation from "./Components/navigation";
import Messages from "./Messages";
import AppRoutes from "./Routes/app_routes";
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


const SignUp = () => {
  const clientId = '483228021662-givrndsnnso527e6b1jkkkkl2udult6d.apps.googleusercontent.com'

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
      <body className='App-body'>
        <section className='Form my-4 mx-5'>
          <div className='container'>
            <div className='row no-gutters'>
              <div className='col-lg-7 px-5 pt-5'>
                <h1 className='font-weight-bold py-3'>Create an account!</h1>
                <form>
                  <div className='form-row'>
                    <div>
                      <input type='e-mail' placeholder='E-mail' className='form-control my-3 p-4'></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div>
                      <input type='password' placeholder='Password' className='form-control my-3 p-4'></input>
                    </div>
                  </div>
                  <div className='form-button'>
                    <div className='col-lg-8'>
                      <button type='button' className='button1'>Sign Up</button>
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
      </body>
  );
}

export default SignUp;