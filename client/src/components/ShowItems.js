import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowItems({ timeline }) {
  return (
    <div className="carousel-item active">
      <div className="d-flex flex-column align-items-center">
        {timeline.map((item) => (
          <div
            key={item.postId}
            className="card"
            style={{ width: "600px", margin: "10px" }}
          >
            <div className="card-body">
              <header className="card-title">
                <span>
                  <img
                    src={item.profileImage}
                    style={{ borderRadius: "50%" }}
                  ></img>
                </span>
                <span>
                  <strong>{item.screenName}</strong>
                </span>
                <span>@{item.userName}</span>
                <div>{item.time}</div>
              </header>
              <div className="card-text">{item.context}</div>
              {/*To Do: add symbols  */}
              <span>{item.retweets} </span>
              <span> {item.favorite}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowItems;
