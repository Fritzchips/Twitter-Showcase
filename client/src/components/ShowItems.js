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
              minWidth: "300px",
              maxWidth: "600px",
              margin: "10px",
            }}
          >
            <div className="card-body">
              <header className="card-title d-flex flex-row justify-content-between">
                <span className="d-flex flex-row ">
                  <div>
                    <img
                      src={item.profileImage}
                      style={{ borderRadius: "50%" }}
                    ></img>
                  </div>
                  <div className="d-flex align-items-start flex-column">
                    <div>
                      <strong>{item.screenName}</strong>
                    </div>

                    <div style={{ color: "#AAB8C2", position: "relative" }}>
                      @{item.userName}
                    </div>
                  </div>
                </span>

                <span>
                  <img
                    src="/images/latest-twitter.png"
                    style={{ height: "25px" }}
                  />
                </span>
              </header>
              <div className="card-text d-flex flex-column">
                <div className="d-flex align-items-start">
                  <div
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
                <div>
                  {item.contentLink.length > 0 ? (
                    <ImageDisplay contentLink={item.contentLink} />
                  ) : (
                    <></>
                  )}
                </div>
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
