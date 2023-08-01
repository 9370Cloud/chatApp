/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 입력 데이터 길이 검증
      if (username.length < 6 || username.length > 15) {
        return setErrorMessage("아이디는 6자 이상 15자 이하로 해조잉");
      }

      if (password.length < 8 || password.length > 20) {
        return setErrorMessage("비밀번호는 8자 이상 20자 이하로 해조잉");
      }

      const response = await axios.post("http://localhost:8080/signup", {
        username: username,
        password: password,
      });

      // 회원가입 성공하면?
      console.log(response.data);
    } catch (error) {
      // 회원가입 실패하면?
      console.error("실패 ㅋㅋ ", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <Container
      className="login-wrapper mt-5"
      style={{ width: "400px", height: "350px" }}
    >
      <h2>Signup</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      {/* 에러 메시지 출력 */}
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
        <Button variant="danger" type="submit">
          회원가입
        </Button>
      </form>
    </Container>
  );
}

export { Signup };
