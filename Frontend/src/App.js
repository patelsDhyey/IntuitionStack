import logo from './css/img/Logo.png';
import './css/App.css';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

function App() {
  return (

    <>
      <div className="App">
        <div className="Preloader">
          <center> Loading...<br />Intuition Stack!</center>
        </div>
        <header className="card">
          <img src={logo} alt='Logo Loading' className='Logo'></img>
          <div className="card-welcome">
            <h1> Welcome to <span>I</span>ntuition <span>S</span>tack </h1>
            <br />
            <h3>Platform, where your ideas gets Implement!</h3>
          </div>
          <div classname="card-body">
            <Link to="/Login" className="side-button-top">Log in</Link>
            <Link to="/Signup" className="side-button">Sign up</Link>
          </div>
          {/* <div classname="card-body">
          <Link to="/AdminLogin" className="side-button-admin"> Admin Log in</Link>
        </div> */}

        </header>

      </div>
    </>
  );
}

export default App;
