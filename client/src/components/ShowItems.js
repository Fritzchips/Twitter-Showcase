import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ShowItems({ timeline }) {
  return (
    <Container>
      {/* <div className="d-flex flex-column align-items-center">
        {timeline.map((item) => (
          <div key={item.postId} style={{ width: "600px", margin: "10px" }}>
            <Row>
              <Col xs={3}>
                <img
                  src={item.profileImage}
                  style={{ borderRadius: "50%" }}
                ></img>
              </Col>
              <Col xs={9}>
                <Row>
                  <Col xs={7}>
                    <strong>{item.screenName}</strong>@{item.userName}
                    {item.time}
                  </Col>
                  <Col xs={2}></Col>
                  <Col xs={3}>
                    <img
                      src="/images/latest-twitter.png"
                      style={{ height: "30px" }}
                    />
                  </Col>
                </Row>
                <Row>{item.context}</Row>
                <Row className="d-flex flex-row align-items-center">
                  <Col xs={6}>favorite {item.favorite}</Col>
                  <Col xs={6}>retweet {item.retweets}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        ))}
      </div> */}
      <div className="d-flex flex-column align-items-center">
        {timeline.map((item) => (
          <div
            key={item.postId}
            className="card"
            style={{ width: "600px", margin: "10px" }}
          >
            <div className="card-body">
              <header className="card-title d-flex flex-row align-items-center">
                <span>
                  <img
                    src={item.profileImage}
                    style={{ borderRadius: "50%" }}
                  ></img>
                </span>
                <span>
                  <span>
                    <strong>{item.screenName}</strong>
                  </span>
                  <div>@{item.userName}</div>
                </span>

                <span style={{ float: "right" }}>
                  <img
                    src="/images/latest-twitter.png"
                    style={{ height: "30px" }}
                  />
                </span>
              </header>
              <div className="card-text">
                <div>{item.context}</div>
              </div>
              <div>{item.time}</div>
              <span>{item.retweets} </span>
              <span> {item.favorite}</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ShowItems;
