import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

function ShowItems({ timeline }) {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        {timeline.map((item) => (
          <div
            key={item.postId}
            className="card"
            style={{ width: "600px", margin: "10px" }}
          >
            <div className="card-body">
              <header className="card-title d-flex flex-row justify-content-between">
                <span>
                  <img
                    src={item.profileImage}
                    style={{ borderRadius: "50%" }}
                  ></img>
                  <span>
                    <span>
                      <strong>{item.screenName}</strong>
                    </span>
                    <div>@{item.userName}</div>
                  </span>
                </span>

                <span>
                  <img
                    src="/images/latest-twitter.png"
                    style={{ height: "30px" }}
                  />
                </span>
              </header>
              <div className="card-text">
                <div>{item.context}</div>
                <img src={item.contextImg} />
              </div>
              <div>{item.time}</div>
              <span>
                <img src="/images/retweet.png" style={{ height: "30px" }} />
                {item.retweets}
              </span>
              <span>
                <img src="/images/like.png" style={{ height: "30px" }} />{" "}
                {item.favorite}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ShowItems;
