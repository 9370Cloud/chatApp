/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import styled from "styled-components";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: username,
        password: password,
      });

      // 로그인에 성공한 경우 처리
      console.log(response.data);
    } catch (error) {
      // 로그인에 실패한 경우 처리
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="사용자명"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="danger" type="submit">로그인</Button>
      </form>
    </div>
  );
}

export { Login };
