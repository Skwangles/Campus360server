import React, { ChangeEvent } from "react";

interface AreaSelectProps {
  areas: Area[];
  selectedArea: string;
  onSelectArea: (areaId: string) => void;
  onCreateArea: () => void;
}

const AreaSelect: React.FC<AreaSelectProps> = ({
  areas,
  selectedArea,
  onSelectArea,
  onCreateArea,
}) => {
  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectArea(e.target.value);
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
      <button onClick={onCreateArea}>Create Area</button>
    </div>
  );
};

export default AreaSelect;
