import React from "react";
import Container from "react-bootstrap/Container";
import TweetImageBox from "./TweetImageBox";
import "../styles/TweetsCard.css";

function TweetsCard({ listOfTweets }) {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        {listOfTweets.map((item) => (
          <div key={item.postId} className="card card-container-size">
            <div className="card-body">
              <header className="card-title d-flex flex-row justify-content-between">
                <span className="d-flex flex-row ">
                  <div>
                    <img
                      src={item.profileImage}
                      className="card-profile-image"
                    ></img>
                  </div>
                  <div className="d-flex align-items-start flex-column">
                    <div>
                      <strong>{item.screenName}</strong>
                    </div>
                    <div className="card-username">@{item.userName}</div>
                  </div>
                </span>
                <span>
                  <img
                    src="/images/latest-twitter.png"
                    className="card-bird-img"
                  />
                </span>
              </header>
              <div className="card-text d-flex flex-column">
                <div className="d-flex align-items-start ">
                  <div className="card-text-size">{item.text}</div>
                </div>
                <br></br>
                <div className="card-img-box">
                  {item.images.length > 0 ? (
                    <TweetImageBox images={item.images} />
                  ) : (
                    <></>
                  )}
                </div>
                {item.images.length > 0 ? <br></br> : <></>}
              </div>
              <div className="text-start card-time">{item.time}</div>
              <hr></hr>
              <div className="d-flex justify-content-around">
                <span>
                  <img src="/images/retweet.png" className="card-retweet" />
                  <strong>{item.retweet}</strong>
                </span>
                <span>
                  <img src="/images/like.png" className="card-like" />
                  <strong>{item.like}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
        <br></br>
      </div>
    </Container>
  );
}

export default TweetsCard;
