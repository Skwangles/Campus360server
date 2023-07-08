import { useEffect, useState } from "react";
import "./App.css";
import CampusSelect from "./campusSelect";

type Campus = {
  name: string;
};

function App() {
  const [campus, setCampus] = useState<string | null>(null);

  return (
    <>
      <CampusSelect setCampus={setCampus} />

      <input type="text" placeholder="campus name..."></input>
      <input type="button">Create New</input>
    </>
  );
}

export default App;
