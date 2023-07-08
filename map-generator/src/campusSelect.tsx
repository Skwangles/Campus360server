import React, { useEffect, useState } from "react";

type Campus = {
  _id: string;
  name: string;
};

type CampusSelectProps = {
  setCampus: (campusId: string) => void;
};

const CampusSelect = ({ setCampus }: CampusSelectProps) => {
  const [campuses, setCampuses] = useState<Campus[]>([]);

  useEffect(() => {
    fetch("/campuses") // Assuming the API endpoint is available at the root path
      .then((response) => response.json())
      .then((data: Campus[]) => setCampuses(data))
      .catch((error) => console.error("Error fetching campuses:", error));
  }, []);

  const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const campusId = event.target.value;
    setCampus(campusId);
  };

  return (
    <select onChange={handleCampusChange}>
      {campuses.map((campus) => (
        <option key={campus._id} value={campus._id}>
          {campus.name}
        </option>
      ))}
    </select>
  );
};

export default CampusSelect;
