import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useExample } from '../../contexts';

import logoImg from './logo.png';
import signInImg from './sign in2.png';

import backgroundmp4 from './background.mp4';

import './login.css';

export default function LoginPage() {
  //NEED TO IMPORT FROM NEW CONTEXT
  const {
    isLoggedIn,
    setIsLoggedIn,
    userID,
    setUserID,
    setUsername,
    setAchievements,
  } = useExample();
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [user, setUser] = useState('');

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
      console.log(resData);
      const dataUser = resData.username;
      setUserID(resData.id);
      setAchievements(resData.achievements);
      setUsername(resData.name);
      setUser(dataUser);
      navigate('/dashboard');
      // navigate('/dashboard', { state: { user: "user" } });
    } else {
      //alert(data.error);
      setIsLoggedIn(false);
      setIncorrectCredentials(true);
      console.log(incorrectCredentials);
      setTimeout(() => {
        setIncorrectCredentials(false);
      }, 5000);
    }
  }

  function register() {
    navigate('/register');
  }

  // useEffect(() => {
  //   setIsLoggedIn(false);
  //   localStorage.clear();
  //   setUserID(0);
  // }, []);

  return (
    <div className="login-page real-login">
      <video id="video-background" autoPlay loop muted>
        <source src={backgroundmp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div id="overlay"></div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 login-title text-center">
          <img src={logoImg} alt="city 72" className="img-fluid" />

          <form className="login-form">
            <input
              type="text"
              placeholder="Username"
              className="username-text"
              onChange={handleInput}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="password-text"
              onChange={handlePassword}
              required
            />

            <button
              type="submit"
              className="sign-in-btn"
              onClick={handleSubmit}
            >
              <img src={signInImg} alt="sign in" />
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-12 text-center">
          <button className="register-acc" onClick={register} data-testid="registerBtn">
            Create an Account
          </button>
        </div>
      </div>

      {incorrectCredentials ? (
        <h3
          className="incorrect"
          style={{ color: '#FF0000', textAlign: 'center' }}
        >
          Incorrect Credentials
        </h3>
      ) : (
        ''
      )}
    </div>
  );
}
