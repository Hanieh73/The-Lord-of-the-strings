import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Footer } from '../../components';
import logoImg from './logo.png';
import registerImg from './register.png';

import '../LoginPage/login.css';
import backgroundmp4 from './background.mp4';
export default function RegisterPage() {
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formName, setFormName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  useEffect(() => {
    document.body.classList.add('login-page');
    document.body.classList.remove('home-page');
    document.body.classList.remove('signup-page');

    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const navigate = useNavigate();

  function handleInput(e) {
    setFormUsername(e.target.value);
  }

  function handlePassword(e) {
    setFormPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handleName(e) {
    setFormName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formPassword !== confirmPassword) {
      setIncorrectCredentials(true);
      setTimeout(() => {
        setIncorrectCredentials(false);
      }, 5000);
      return;
    }

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
      'http://localhost:3000/users/register',
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

  function loginPage() {
    navigate('/login');
  }

  return (
    <div className="login-page reg-login">
      <video id="video-background" autoPlay loop muted>
        <source src={backgroundmp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div id="overlay"></div>

      <div className="row">
        <div className="col-3"></div>

          <div className="col-6 login-title text-center">
            <img src={logoImg} alt="city 72" className='img-fluid' />

            <form className='login-form'>

            <input type="text" placeholder="Name" className="name-text" onChange={handleInput} required/>
            <input type="text" placeholder="Username" className="username-text" onChange={handleInput} required/>
            <input type="password" placeholder="Password" className="password-text" onChange={handlePassword} required/>
            <input type="password" placeholder="Confirm password" className="password-text" onChange={handleConfirmPassword} required/>
            

            <button type="submit" className='register-btn' onClick={handleSubmit}>
              <img src={registerImg} alt="register"/>

            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-12 text-center">
          <button className="register-acc login-acc" onClick={loginPage}>
            Already have an account?
          </button>
        </div>
      </div>


      {incorrectCredentials ? (
          <h3 className="incorrect" style={{ color: '#FF0000', textAlign: 'center' }}>
            Passwords do not match!
          </h3>
        ) : (
          ''
        )}



    </div>
  );
}
