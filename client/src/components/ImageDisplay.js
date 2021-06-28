import React from "react";

function ImageDisplay({ contentLink }) {
  let styleValue = "280px";
  if (contentLink.length === 1) {
    styleValue = "550px";
  }
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center">
      {contentLink.map((image) => (
        <div key={image.mediaKey}>
          <img
            src={image.url}
            style={{ maxWidth: `${styleValue}` }}
            className="rounded"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageDisplay;
