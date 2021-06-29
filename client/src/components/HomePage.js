import React from "react";
import Carousel from "react-bootstrap/Carousel";

function HomePage() {
  return (
    <div>
      <header>
        <h1>Travel Tweets</h1>
      </header>
      <Carousel fade>
        <Carousel.Item>
          <div className="d-flex">
            <span>
              <p>Relax and enjoy travelling without missing a beat!</p>
              <p>Stay uptodate with the latest Trends</p>
            </span>
            <span>
              <img
                className="d-block w-100"
                src="/images/beach.png"
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
      </Carousel>
    </div>
  );
}

export default HomePage;
