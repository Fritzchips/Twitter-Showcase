import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <Container fluid>
      <div className="home-background">
        <div className="home-modal">
          <Jumbotron fluid>
            <Container>
              <div className="home-jumbotext">
                <h1>Welcome to Sweet Tweet!</h1>
                <p>
                  A full-stack tweet generator deployed to Heroku using
                  NodeJS/Express, Axios, React and Bootstraps.
                </p>
                <p>
                  Staying in touch made easy, search by username or content name
                  and the most recent tweets will be displayed. Dive into random
                  single tweets with favorites, where you will discover users
                  that inspire me.
                </p>
              </div>
            </Container>
          </Jumbotron>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
