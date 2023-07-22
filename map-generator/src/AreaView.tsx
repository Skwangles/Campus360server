import React, { useState, useRef, useEffect } from "react";
import { API } from "./constants";
import getBase64 from "./utils";
import PointDot from "./PointDot";
import PointForm from "./PointForm";

interface Props {
  area: Area;
  points: Point[];
  onCreatePoint: (point: Partial<Point>, img: string) => void;
}

function AreaView({ area, points, onCreatePoint }: Props) {
  const [creatingPoint, setCreatingPoint] = useState<boolean>(false);
  const [imagePosition, setImagePosition] = useState({ left: 0, top: 0 });
  const [pointCoordinates, setPointCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [newPointData, setNewPointData] = useState<Partial<Point>>({}); // Default values are handled by mongoose

  const [selectedImage, setSelectedImage] = useState<string>("");

  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (creatingPoint && imageRef.current) {
      const { left, top } = imageRef.current.getBoundingClientRect();
      const x = (event.clientX - left) / imageRef.current.offsetWidth;
      const y = (event.clientY - top) / imageRef.current.offsetHeight;
      setPointCoordinates({ x, y });
      setNewPointData({ ...newPointData, x, y });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files.length > 0) {
      getBase64(e.target?.files[0])
        .then((base64) => {
          setSelectedImage(base64);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPointData({ ...newPointData, [name]: value });
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const { left, top } = imageRef.current.getBoundingClientRect();
      setImagePosition({ left, top });
    }
  };

  const handleCreatePoint = () => {
    if (selectedImage) {
      onCreatePoint(newPointData, selectedImage);
    }

    setCreatingPoint(false);
    setPointCoordinates(null);
    setNewPointData({});
  };

  return (
    <>
      <img
        src={area.image.base64}
        alt={area.name}
        onClick={handleImageClick}
        onLoad={handleImageLoad}
        style={{
          cursor: creatingPoint ? "crosshair" : "auto",
          maxHeight: "80vh",
        }}
        ref={imageRef}
      />

      {imageRef.current?.offsetHeight &&
        imageRef.current
          ?.offsetWidth /* Check there is actually an image to show over */ &&
        points.map((point) => (
          <PointDot
            key={point._id}
            point={point}
            imagePosition={imagePosition}
            imageRef={imageRef}
            colour="blue"
          />
        ))}

      {imageRef.current?.offsetHeight &&
        imageRef.current?.offsetWidth &&
        creatingPoint &&
        pointCoordinates && (
          // Create Point Dot
          <PointDot
            key={"newPoint"}
            point={pointCoordinates}
            imagePosition={imagePosition}
            imageRef={imageRef}
            colour="red"
          />
        )}

      {creatingPoint && pointCoordinates && (
        // Create Point Form
        <PointForm
          pointCoordinates={pointCoordinates}
          newPointData={newPointData}
          selectedImage={selectedImage}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          handleCreatePoint={handleCreatePoint}
        />
      )}

      <button onClick={() => setCreatingPoint(!creatingPoint)}>
        {creatingPoint ? "Cancel Creating Point" : "Create Point"}
      </button>
    </>
  );
}

export default AreaView;
