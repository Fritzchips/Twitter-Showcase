import React from "react";

function ImageDisplay({ contentLink }) {
  console.log(contentLink);
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center">
      {contentLink.map((image) => (
        <div key={image.mediaKey}>
          <img src={image.url} style={{ maxWidth: "280px" }} />
        </div>
      ))}
    </div>
  );
}

export default ImageDisplay;
