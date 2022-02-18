import React, { useState, useEffect } from "react";
import poto from "../cirno.jpg";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";

function NavCm() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  };
  function CheckLog() {
    if (user) {
      return (
        <Nav>
          <Nav.Link>
            {user.username}
            <span style={{ color: "black " }} className="icolog">
              <BsFillPersonFill />
            </span>
          </Nav.Link>
          <Nav.Link>
            <Button variant="dark" className="btn-sm" onClick={() => logout()}>
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link href="/login">
            <Button variant="dark" className="btn-sm">
              Login
            </Button>
          </Nav.Link>
          <Nav.Link href="/register">
            <Button variant="dark" className="btn-sm">
              Register
            </Button>
          </Nav.Link>
        </Nav>
      );
    }
  }
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#a18d6c" }}
        expand="lg"
        variant="dark"
        className="sticky-top"
      >
        <Container>
          <Navbar.Brand href="/">
            Rimticle
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/pendidikan">Pendidikan</Nav.Link>
              {user && user.role === "admin" && (
                <Nav.Link href="/create">Buat Artikel</Nav.Link>
              )}
            </Nav>
            <CheckLog />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default NavCm;
