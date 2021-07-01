import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavContainer() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="sm"
        style={{ backgroundColor: "#1DA1F2" }}
        variant="dark"
      >
        <img
          src="/images/box-twitter2.png"
          style={{ height: "60px", marginLeft: "5%" }}
        />
        <div
          style={{
            fontFamily: "cursive",
            fontSize: "25px",
            color: "yellow",
          }}
        >
          <strong>TRAVEL TWEETS</strong>
        </div>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "5%" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto d-flex flex-row justify-content-around ">
            <Link
              className="nav-link"
              to={"/"}
              style={{
                fontSize: "20px",
              }}
            >
              Home
            </Link>
            <Link
              className="nav-link"
              to={"/search"}
              style={{ fontSize: "20px" }}
            >
              Tweets Search
            </Link>
            <Link
              className="nav-link"
              to={"/top-picks"}
              style={{ fontSize: "20px" }}
            >
              Top Picks
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavContainer;
