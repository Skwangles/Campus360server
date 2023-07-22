import React, { useState } from "react";
import PanoramaViewerWithSlider from "./PanoramaViewerWithSlider";

interface PointFormProps {
  pointCoordinates: { x: number; y: number };
  newPointData: Partial<Point>;
  selectedImage: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreatePoint: () => void;
  renderPointTypeSelect: () => JSX.Element;
}

const PointForm: React.FC<PointFormProps> = ({
  pointCoordinates,
  newPointData,
  selectedImage,
  handleInputChange,
  handleImageUpload,
  handleCreatePoint,
  renderPointTypeSelect,
}) => {
  const [newPointDirection, setNewPointDirection] = useState<number>(0);
  return (
    <div>
      <div>Pan Offset</div>
      <input
        type="number"
        name="pan_offset"
        value={newPointDirection || newPointData.pan_offset || 0}
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
      {selectedImage && selectedImage !== "" && (
        <PanoramaViewerWithSlider
          selectedImage={selectedImage}
          setDirection={setNewPointDirection}
          direction={newPointDirection}
        />
      )}
      <button onClick={handleCreatePoint}>Create Point</button>
    </div>
  );
};

export default PointForm;
