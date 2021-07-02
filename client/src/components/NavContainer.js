import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../styles/NavContainer.css";

function NavContainer() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="nav-background"
        variant="dark"
      >
        <img src="/images/box-twitter.png" className="nav-logo" />
        <div className="nav-title">
          <strong>TRAVEL TWEETS</strong>
        </div>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "5%" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto d-flex flex-row justify-content-around nav-links">
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
            <Link className="nav-link" to={"/search"}>
              Tweets Search
            </Link>
            <Link className="nav-link" to={"/top-picks"}>
              Top Picks
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavContainer;
