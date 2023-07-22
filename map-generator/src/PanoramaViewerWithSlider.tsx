import React, { useState } from "react";
import { Pannellum } from "pannellum-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PanoramaViewerWithSlider = ({
  selectedImage,
  setDirection,
  direction,
}: {
  selectedImage: string;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
  direction: number;
}) => {
  const handleSliderChange = (newValue: number) => {
    setDirection(newValue);
  };

  return (
    <>
      {selectedImage && selectedImage !== "" && (
        <>
          <Pannellum
            width="100%"
            height="500px"
            image={selectedImage}
            yaw={direction} // Use the 'yaw' value to control the direction of the image
            showZoomCtrl={false}
            showFullscreenCtrl={false}
            onLoad={() => console.log("Panorama loaded!")}
          />
          <div
            style={{
              padding: "20px 10px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <Slider
              min={0}
              max={360}
              value={direction}
              onChange={handleSliderChange}
              railStyle={{ backgroundColor: "#ccc" }}
              trackStyle={{ backgroundColor: "#3f51b5" }}
              handleStyle={{
                borderColor: "#3f51b5",
                backgroundColor: "#3f51b5",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PanoramaViewerWithSlider;
