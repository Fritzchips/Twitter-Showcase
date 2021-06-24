import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import RandomTweet from "./components/RandomTweet";
import UserSearch from "./components/UserSearch";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //To Do: add nav dropdown for smaller screens
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1>Navbar</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/UserSearch"}>
                UserSearch
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/RandomTweet"}>
                RandomTweets
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <header>
        <h1>Twitter Showcase</h1>
      </header>
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/UserSearch"} component={UserSearch} />
        <Route exact path={"/RandomTweet"} component={RandomTweet} />
      </Switch>
    </div>
  );
}

export default App;
