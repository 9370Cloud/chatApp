/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

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
    <Container className="login-wrapper mt-5" style={{width: '400px', height: '350px'}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="m-2">
        <input
          type="text"
          placeholder="사용자명"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="mb-2">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <Button variant="danger" type="submit">로그인</Button>
      </form>
      <p className="mt-3" onClick={()=>{
        navigate("/signup");
      }}>회원가입하실?</p>
    </Container>
  );
}

export { Login };
