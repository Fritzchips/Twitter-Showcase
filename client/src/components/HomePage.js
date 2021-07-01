import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

function HomePage() {
  return (
    <div>
      <img
        className="position-absolute-center"
        src="/images/background.jpg"
        style={{ width: "100%", zIndex: "1" }}
      />
      <Jumbotron fluid>
        <Container>
          <div style={{ zIndex: "10" }}>
            <h1>Welcome to Travel Tweets!</h1>
            <p>
              A full-stack Tweet generator that uses Axios to grab data from the
              Twitter API. Data is controlled by NodeJS/Express server and
              rendered to the UI with React and Bootstraps.
            </p>
            <p>Explore Travel Tweets with these great features</p>
            <ul>
              <li>
                Find a user and check their most recent timeline or mentions
              </li>
              <li>Search any topic with content relating</li>
            </ul>
          </div>
        </Container>
      </Jumbotron>
      {/* <header>
        <h1>Welcome to Travel Tweets</h1>
      </header> */}

      {/* <Carousel fade>
        <Carousel.Item>
          <div className="d-flex">
            <span>
              <p>Relax and enjoy travelling without missing a beat!</p>
              <p>Stay uptodate with the latest Trends</p>
            </span>
            <span>
              <img
                className="d-block w-100"
                src="/images/beach2.png"
                alt="First slide"
                style={{ borderRadius: "50%" }}
              />
            </span>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <p>Find the latest info on your favorite people </p>
          <img
            className="d-block w-100"
            src="/images/circle-twitter.png"
            alt="Second slide"
            style={{ width: "100px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <p>See random tweets from my top picks!</p>
          <img
            className="d-block w-100"
            src="/images/latest-twitter.png"
            alt="Third slide"
            style={{ width: "100px" }}
          />
        </Carousel.Item>
      </Carousel> */}
    </div>
  );
}

export default HomePage;
