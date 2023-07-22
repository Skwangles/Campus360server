import React from "react";

interface PointDotProps {
  point: Partial<Point>;
  imagePosition: { left: number; top: number };
  imageRef: React.RefObject<HTMLImageElement>;
  colour: string;
}

const PointDot: React.FC<PointDotProps> = ({
  point,
  imagePosition,
  imageRef,
  colour,
}) => {
  if (imageRef.current === null || !point) {
    return <div>No Image to overlay on!</div>;
  }

  return (
    <div
      onClick={() => console.log(point)}
      style={{
        position: "absolute",
        left: `${
          point.x * imageRef.current.offsetWidth + imagePosition.left
        }px`,
        top: `${point.y * imageRef.current.offsetHeight + imagePosition.top}px`,
        transform: "translate(-50%, -50%)",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: colour,
        color: "black",
      }}
    >
      {point.type?.name || ""}
    </div>
  );
};

export default PointDot;
