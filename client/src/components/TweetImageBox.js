import React from "react";

function TweetImageBox({ images }) {
  return (
    <div className="d-flex flex-warp align-items-start  justify-content-around">
      {images.map((image) => (
        <div key={image.mediaKey}>
          <img
            src={image.imageUrl}
            style={{
              width: "100%",
              height: "280px",
              objectFit: "cover",
            }}
            className="rounded my-1"
          />
        </div>
      ))}
    </div>
  );
}

export default TweetImageBox;
