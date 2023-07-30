/* eslint-disable */
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<대문 />} />
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
            axios.get("http://localhost:8080/").then((결과) => {
              console.log(결과);
            });
          }}
        >
          Test
        </Button>{" "}
      </header>
    </div>
  );
}

export default App;
