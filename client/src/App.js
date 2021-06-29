import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import RandomTweet from "./components/RandomTweet";
import UserSearch from "./components/UserSearch";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Navbar
        collapseOnSelect
        expand="sm"
        style={{ backgroundColor: "#1DA1F2" }}
        variant="dark"
      >
        <img
          src="/images/crop-twitter.png"
          style={{ height: "50px", marginLeft: "5%" }}
        />
        {/* <div className="d-flex flex-column "> */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "5%" }}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-around "
        >
          <Nav className="mr-auto d-flex flex-row justify-content-around ">
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
            <Link className="nav-link" to={"/UserSearch"}>
              UserSearch
            </Link>
            <Link className="nav-link" to={"/RandomTweet"}>
              RandomTweets
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route exact path={"/UserSearch"} component={UserSearch} />
          <Route exact path={"/RandomTweet"} component={RandomTweet} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
