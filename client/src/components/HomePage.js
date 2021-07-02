import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <Container fluid>
      <br></br>
      <div className="home-background">
        <div className="home-modal">
          <Jumbotron fluid>
            <Container>
              <div className="home-jumbotext">
                <h1>Welcome to Travel Tweets!</h1>
                <p>
                  A full-stack Tweet generator deployed to Heroku using
                  NodeJS/Express, Axios, React and Bootstraps.
                </p>
                <p>
                  Explore Tweets Search to discover hidden gems with related
                  content or stay up to date with your favourite artists. Dive
                  into my Top Picks for random tweets from a few of my
                  favourites!
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
