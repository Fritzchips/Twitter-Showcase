import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import TopPicksPage from "./components/TopPicksPage";
import SearchPage from "./components/SearchPage";
import { Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavContainer from "./components/NavContainer";

function App() {
  return (
    <div className="App">
      <NavContainer />
      <Container>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route exact path={"/search"} component={SearchPage} />
          <Route exact path={"/top-picks"} component={TopPicksPage} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
