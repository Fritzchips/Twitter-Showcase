import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import FavoritesPage from "./components/FavoritesPage";
import SearchPage from "./components/SearchPage";
import { Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavContainer from "./components/NavContainer";

function App() {
  return (
    <div className="App">
      <div style={{ width: "100vw", height: "100vh" }}>
        <NavContainer />
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/favorites" component={FavoritesPage} />
          </Switch>
        </Container>
      </div>
    </div>
  );
}

export default App;
