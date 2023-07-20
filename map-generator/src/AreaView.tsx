import React, { useState, useRef, useEffect } from "react";
import { API } from "./constants";
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pointTypes, setPointTypes] = useState<PointType[]>([]); // State to store the fetched pointTypes
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Fetch the list of pointTypes when the component mounts
    fetch(`${API}/pointTypes`) // Replace this URL with your server's API endpoint to fetch pointTypes
      .then((response) => response.json())
      .then((data) => setPointTypes(data))
      .catch((error) => console.error("Error fetching pointTypes:", error));
  }, []);

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
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
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
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target?.result as string;
        onCreatePoint(newPointData, base64Image);
      };
      reader.readAsDataURL(selectedImage);
    }

    setCreatingPoint(false);
    setPointCoordinates(null);
    setNewPointData({});
  };

  // Render the dropdown select element for pointTypes
  const renderPointTypeSelect = () => {
    return (
      <div>
        <div>Point Types</div>
        <select
          name="type"
          value={newPointData.type?.toString() || ""} // Use .toString() to compare ObjectId with string
          onChange={handleInputChange}
        >
          <option value="">Select PointType</option>
          {pointTypes.map((pointType) => (
            <option key={pointType._id} value={pointType._id}>
              {pointType.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <h2>{area.name}</h2>
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
          <div
            key={point._id}
            style={{
              position: "absolute",
              left: `${
                point.x * imageRef.current.offsetWidth + imagePosition.left
              }px`,
              top: `${
                point.y * imageRef.current.offsetHeight + imagePosition.top
              }px`,
              transform: "translate(-50%, -50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "blue",
              color: "black",
            }}
          >
            {point.type.name}
          </div>
        ))}

      {imageRef.current?.offsetHeight &&
        imageRef.current?.offsetWidth &&
        creatingPoint &&
        pointCoordinates && (
          // Create Point Dot
          <div
            style={{
              position: "absolute",
              left: `${
                pointCoordinates.x * imageRef.current.offsetWidth +
                imagePosition.left
              }px`,
              top: `${
                pointCoordinates.y * imageRef.current.offsetHeight +
                imagePosition.top
              }px`,
              transform: "translate(-50%, -50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "red", // Change the color to your preference
            }}
          />
        )}

      {creatingPoint && pointCoordinates && (
        // Create Point Form
        <div>
          <div>Pan Offset</div>
          <input
            type="number"
            name="pan_offset"
            value={newPointData.pan_offset || 0}
            onChange={handleInputChange}
            placeholder="Pan Offset"
          />
          <div>Tilt Offset</div>
          <input
            type="number"
            name="tilt_offset"
            value={newPointData.tilt_offset || 0}
            onChange={handleInputChange}
            placeholder="Tilt Offset"
          />
          {renderPointTypeSelect()} {/* Render the dropdown select element */}
          <div>Coordinates</div>
          <div>
            <div>X (%)</div>
            <input
              type="number"
              name="x"
              value={(newPointData.x || pointCoordinates.x) * 100}
              onChange={handleInputChange}
              placeholder="X"
            />
            <div>Y (%)</div>
            <input
              type="number"
              name="y"
              value={(newPointData.y || pointCoordinates.y) * 100}
              onChange={handleInputChange}
              placeholder="Y"
            />
          </div>
          <div>Image</div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleCreatePoint}>Create Point</button>
        </div>
      )}

      <button onClick={() => setCreatingPoint(!creatingPoint)}>
        {creatingPoint ? "Cancel Creating Point" : "Create Point"}
      </button>
    </div>
  );
}

export default AreaView;
