import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Footer } from '../../components';
import logoImg from "./logo.png";

import "../LoginPage/login.css";

export default function RegisterPage() {
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formName, setFormName] = useState('');


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

  function handleName(e) {
    setFormName(e.target.value);
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
        name: formName,
      }),
    };
    const response = await fetch(
      'https://city-72-wez6.onrender.com/users/register',
      options
    );
    const data = await response.json();

    if (response.status == 201) {
      //window.location.assign('/login');
      navigate('/login');
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="login-page">
      <div className="row">
        <div className="col-3"></div>
          <div className="col-6 login-title text-center">
            <img src={logoImg} alt="city 72" className='img-fluid' />

            <form className='login-form'>

            <input type="text" placeholder="Name" className="name-text" onChange={handleInput} required/>
            <input type="text" placeholder="Username" className="username-text" onChange={handleInput} required/>
            <input type="password" placeholder="Password" className="password-text" onChange={handlePassword} required/>
            

            <button type="submit" className='register-btn' onClick={handleSubmit}>
              register
            </button>


            </form>
          </div>
        <div className="col-3"></div> 
      </div>


    </div>
  );
}
