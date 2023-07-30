/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <대문/> } /> 
    </Routes>
  );
}

function 대문(){
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant="danger" onClick={()=>{
          axios.get('http://localhost:8080/').then((결과)=>{
            console.log(결과)
          })
        }}>Test</Button>{' '}
      </header>
    </div>
  )
}

export default App;
