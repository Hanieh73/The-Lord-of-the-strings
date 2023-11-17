import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useExample } from '../../contexts';

import logoImg from "./logo.png";
import signInImg from "./sign in.png";

import "./login.css"



export default function LoginPage() {
  //NEED TO IMPORT FROM NEW CONTEXT
  const { isLoggedIn, setIsLoggedIn, userID, setUserID, setUsername } =
    useExample();
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.remove("home-page");
    document.body.classList.remove("signup-page")

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);



  const navigate = useNavigate();

  function handleInput(e) {
    setFormUsername(e.target.value);
  }

  function handlePassword(e) {
    setFormPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formUsername,
        password: formPassword,
      }),
    };
    const response = await fetch('https://city-72-wez6.onrender.com/users/login', options);
    const data = await response.json();

    if (response.status == 200) {
      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      // window.location.assign('/');
      const option = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: data.token,
        }),
      };
      const res = await fetch('https://city-72-wez6.onrender.com/users/showId', option);
      const resData = await res.json();
      setUserID(resData.id);
      setUsername(resData.name);
      navigate('/');
    } else {
      //alert(data.error);
      setIsLoggedIn(false);
      setIncorrectCredentials(true);
      setTimeout(() => {
        setIncorrectCredentials(false);
      }, 5000);
    }
  }

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.clear();
    setUserID(0);
  }, []);

  return (
    <div className="login-page real-login">
      <div className="row">
        <div className="col-3"></div>
          <div className="col-6 login-title text-center">
            <img src={logoImg} alt="city 72" className='img-fluid' />

            <form className='login-form' onClick={handleSubmit}>

            
            <input type="text" placeholder="Username" className="username-text" onChange={handleInput} required/>
            <input type="password" placeholder="Password" className="password-text" onChange={handlePassword} required/>

            <button type="submit" className='sign-in-btn'>
              <img src={signInImg} alt="sign in" />
            </button>
            
            </form>
          </div>
        <div className="col-3"></div> 
      </div>


    </div>
  );
}
