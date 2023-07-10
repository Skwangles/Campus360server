import React, { ChangeEvent } from "react";

interface CampusSelectProps {
  campuses: Campus[];
  selectedCampus: string;
  onSelectCampus: (campusId: string) => void;
  onCreateCampus: () => void;
}

const CampusSelect: React.FC<CampusSelectProps> = ({
  campuses,
  selectedCampus,
  onSelectCampus,
  onCreateCampus,
}) => {
  const handleCampusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectCampus(e.target.value);
  };

  return (
    <div>
      <select value={selectedCampus} onChange={handleCampusChange}>
        <option value="">Select a campus</option>
        {campuses.map((campus) => (
          <option key={campus._id} value={campus._id}>
            {campus.name}
          </option>
        ))}
      </select>
      <button onClick={onCreateCampus}
      //TODO: Test it actually creates
      >Create Campus</button>
    </div>
  );
};

export default CampusSelect;
