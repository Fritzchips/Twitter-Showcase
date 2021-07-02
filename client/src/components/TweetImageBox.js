import React from "react";
import "../styles/TweetsCard.css";

function TweetImageBox({ images }) {
  return (
    <div className="d-flex flex-warp align-items-start  justify-content-around">
      {images.map((image) => (
        <div key={image.mediaKey}>
          <img
            src={image.imageUrl}
            className="rounded my-1 card-image-content"
          />
        </div>
      ))}
    </div>
  );
}

export default TweetImageBox;
