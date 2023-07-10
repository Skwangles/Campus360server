import React, { useState } from "react";
import $ from "jquery";

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
  const [coords, setCoords] = useState([0, 0]);

  $("#map").on("click", function (e) {
    // e = Mouse click event.
    const rect = e.target.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width; //x position within the elemen % of width
    const y = (e.clientY - rect.top) / rect.height; //y position within the element % of height
  });

  return (
    <>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <div>
        <h2>{area.name}</h2>
        <img id="map" src={area.base64} alt={area.name} />
        {points.map((point) => (
          <div
            key={point._id}
            style={{ position: "absolute", left: point.x, top: point.y }}
          >
            {point.type}
          </div>
        ))}
      </div>
    </>
  );
};

export default AreaView;
