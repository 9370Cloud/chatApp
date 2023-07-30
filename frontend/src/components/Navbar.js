/* eslint-disable */
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function NavBar() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={(e) => {
                  e.stopPropagation();
                  navigate("/");
                }}>ChatApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link >
              <Button
                variant="warning"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/");
                }}
              >
                Home
              </Button>{" "}
            </Nav.Link>
            <Nav.Link >
              <Button variant="warning" onClick={(e) => {
                  e.stopPropagation();
                  navigate("/login");
                }}>Login</Button>{" "}
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item >Action</NavDropdown.Item>
              <NavDropdown.Item >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item >Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };
