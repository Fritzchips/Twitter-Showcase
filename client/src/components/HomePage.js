import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

function HomePage() {
  const backImage = "/images/beach.png";
  return (
    <Container fluid>
      <br></br>
      <div
        style={{
          backgroundImage: `url(${backImage})`,
          borderRadius: "20px",
          margin: "auto",
          padding: "10px 30px 100px 30px",
          maxWidth: "800px",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "30px",
            width: "100%",
            height: "100%",
            position: "relative",
            top: "0",
            left: "0",
            zIndex: "10",
          }}
        >
          <Jumbotron fluid>
            <Container>
              <div
                style={{
                  fontFamily: "cursive",
                  color: "yellow",
                  margin: "9% auto",
                  padding: "20px",
                  maxwidth: "80%",
                }}
              >
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
