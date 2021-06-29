import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import ImageDisplay from "./ImageDisplay";

function ShowItems({ timeline }) {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        {timeline.map((item) => (
          <div
            key={item.postId}
            className="card"
            style={{
              width: "600px",
              margin: "10px",
            }}
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
                    <div style={{ color: "#AAB8C2" }}>@{item.userName}</div>
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
                <div>{item.text}</div>
                {item.contentLink.length > 0 ? (
                  <ImageDisplay contentLink={item.contentLink} />
                ) : (
                  <></>
                )}
              </div>
              <div className="text-start">{item.time}</div>
              <hr></hr>
              <div className="d-flex justify-content-around">
                <span>
                  <img
                    src="/images/retweet.png"
                    style={{
                      height: "30px",
                      width: "25px",
                      marginRight: "10px",
                    }}
                  />
                  {item.retweet}
                </span>
                <span>
                  <img
                    src="/images/like.png"
                    style={{ height: "30px", marginRight: "10px" }}
                  />
                  {item.like}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ShowItems;
