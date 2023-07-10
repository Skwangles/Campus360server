import React, { ChangeEvent, useState } from "react";

interface AreaSelectProps {
  areas: Area[];
  selectedArea: string;
  onSelectArea: (areaId: string) => void;
  onCreateArea: (name: string, image: string) => void;
}

const AreaSelect: React.FC<AreaSelectProps> = ({
  areas,
  selectedArea,
  onSelectArea,
  onCreateArea,
}) => {
  const [areaName, setAreaName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectArea(e.target.value);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCreateArea = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target?.result as string;
        onCreateArea(areaName, base64Image);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div>
      <select value={selectedArea} onChange={handleAreaChange}>
        <option value="">Select an area</option>
        {areas.map((area) => (
          <option key={area._id} value={area._id}>
            {area.name}
          </option>
        ))}
      </select>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input
        type="text"
        placeholder="Area Name"
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
      />
      <button onClick={handleCreateArea}
      // TODO: Test it actually creates
      >Create Area</button>
    </div>
  );
};

export default AreaSelect;
