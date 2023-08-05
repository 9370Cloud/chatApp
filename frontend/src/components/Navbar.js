/* eslint-disable */
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar() {
  let navigate = useNavigate();
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;";
}

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          >
            ChatApp
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* me-auto : 왼쪽 정렬 */}
            <Nav.Link
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.stopPropagation();
                navigate("/login");
              }}
            >
              Login
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.stopPropagation();
                deleteCookie("jwt")
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.stopPropagation();
                navigate("/signup");
              }}
            >
              Signup
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.stopPropagation();
                const jwtToken = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).split('=')[1]; // 쿠키 스토리지에서 jwtToken 값을 가져옴
            console.log(jwtToken)
            axios.get("http://localhost:8080/list", {headers: {
              Authorization: `Bearer ${jwtToken}`
            }}).then((결과) => {
              navigate("/list")
            });
              }}
            >
              Chat
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="">
              <NavDropdown.Item>장식용임 ㅋㅋ</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            {/* ml-auto : 오른쪽 정렬 */}

            <Nav.Link>
              <Button
                variant="success"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
              >
                Prev
              </Button>{" "}
            </Nav.Link>
            <Nav.Link>
              <Button
                variant="success"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
              >
                Next
              </Button>{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };
