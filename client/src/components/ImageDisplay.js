import React from "react";

function ImageDisplay({ images }) {
  return (
    <div
      style={{
        marginLeft: "3%",
        marginRight: "3%",
        height: "100%",
        /* minHeight: "75%", */
      }}
      className="d-flex flex-warp align-items-center justify-content-center "
    >
      {images.map((image) => (
        <div key={image.mediaKey}>
          <img
            src={image.url}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            className="rounded"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageDisplay;
