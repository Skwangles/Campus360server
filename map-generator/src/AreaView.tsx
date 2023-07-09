import React from "react";

interface Point {
  _id: string;
  type: string;
  x: number;
  y: number;
}

interface Area {
  name: string;
  base64: string;
}

interface AreaViewProps {
  area: Area;
  points: Point[];
}

const AreaView: React.FC<AreaViewProps> = ({ area, points }) => {
  return (
    <div>
      <h2>{area.name}</h2>
      <img src={area.base64} alt={area.name} />
      {points.map((point) => (
        <div
          key={point._id}
          style={{ position: "absolute", left: point.x, top: point.y }}
        >
          {point.type}
        </div>
      ))}
    </div>
  );
};

export default AreaView;
