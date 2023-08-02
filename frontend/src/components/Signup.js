/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import REACT_APP_RECAPTCHA_SITE_KEY from "./sitekey";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(""); // 최상위 범위로 이동
  const [errorMessage, setErrorMessage] = useState("");

  // handleRecaptchaChange 함수를 handleSubmit 바깥으로 이동
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 입력 데이터 길이 검증
      if (username.length < 6 || username.length > 15) {
        return setErrorMessage("아이디는 6자 이상 15자 이하로 해주세요");
      }

      if (password.length < 8 || password.length > 20) {
        return setErrorMessage("비밀번호는 8자 이상 20자 이하로 해주세요");
      }

      if (!recaptchaToken) {
        return setErrorMessage("님 로봇임?");
      }

      // 하나 이상의 영어 문자와 하나 이상의 숫자가 들어가 있는지를 확인하는 정규 표현식을 사용합니다.
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).+$/;

      if (!passwordPattern.test(password)) {
        return setErrorMessage(
          "비번 영어 숫자 둘 다 쓰세용"
        );
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
      <h2 className="mb-2">Signup</h2>
      {errorMessage && (
        <div style={{ color: "red", fontSize: "17px" }}>{errorMessage}</div>
      )}{" "}
      {/* 에러 메시지 출력 */}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-2">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ReCAPTCHA
          sitekey={REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
          className="d-flex justify-content-center"
        />
        <Button variant="danger" type="submit" className="m-2">
          회원가입
        </Button>
        <p style={{ color: "green", fontSize: "14px" }} className="mt-1 mb-3">
          아이디 6~15 글자. 영어 숫자 가능.
        </p>
        <p style={{ color: "brown", fontSize: "13px" }}>
          비번 8~20 글자. 영어랑 숫자 둘 다 써야돼용. ! @ ^ & 사용가능
        </p>
        <p></p>
      </form>
    </Container>
  );
}

export { Signup };
