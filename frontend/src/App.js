/* eslint-disable */
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "./components/Navbar"
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import {ChatList} from "./components/ChatList";
import { CreateChatRoom } from "./components/CreateChatRoom";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<대문 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={<ChatList/>} />
        <Route path="/createchatroom" element={<CreateChatRoom/>} />
        <Route path="*" element={ <div>Not Found 404 ㅋㅋㅋ</div> } />
      </Routes>
    </div>
  );
}

function 대문() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          variant="danger"
          onClick={() => {
            axios.get("http://localhost:8080/test").then((결과) => {
              console.log(결과.data);
            });
          }}
        >
          Test
        </Button>{" "}
        <Button
          variant="danger"
          onClick={() => {
            const jwtToken = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).split('=')[1]; // 쿠키 스토리지에서 jwtToken 값을 가져옴
            console.log(jwtToken)
            axios.get("http://localhost:8080/chat", {headers: {
              Authorization: `Bearer ${jwtToken}`
            }}).then((결과) => {
              console.log(결과.data);
            });
          }}
        >
          Test2
        </Button>{" "}
      </header>
    </div>
  );
}

export default App;
