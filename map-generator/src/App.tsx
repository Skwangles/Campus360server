import React, { useState, useEffect } from "react";
import axios from "axios";
import CampusSelect from "./CampusSelect";
import AreaSelect from "./AreaSelect";
import AreaView from "./AreaView";

const API = "http://localhost:3000";

function App() {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string>("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image|null>(null);

  // Fetch campuses from the server
  useEffect(() => {
    axios
      .get(`${API}/campuses`)
      .then((response) => {
        setCampuses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching campuses:", error);
      });
  }, []);

  // Fetch areas when a campus is selected
  useEffect(() => {
    if (selectedCampus) {
      axios
        .get(`${API}/areas?campus=${selectedCampus}`)
        .then((response) => {
          setAreas(response.data);
        })
        .catch((error) => {
          console.error("Error fetching areas:", error);
        });
    }
  }, [selectedCampus]);

  // Fetch points and image when an area is selected
  useEffect(() => {
    if (selectedArea) {
      axios
        .get(`${API}/points?area=${selectedArea}`)
        .then((response) => {
          setPoints(response.data);
        })
        .catch((error) => {
          console.error("Error fetching points:", error);
        });

      axios
        .get(`${API}/areas/${selectedArea}`)
        .then((response) => {
          setSelectedImage(response.data.image);
        })
        .catch((error) => {
          console.error("Error fetching area:", error);
        });
    }
  }, [selectedArea]);

  const handleCampusChange = (campusId: string) => {
    setSelectedCampus(campusId);
    setSelectedArea("");
    setSelectedImage(null);
  };

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId);
  };

  const handleCreateCampus = () => {
    const campusName = prompt("Enter campus name:");
    if (campusName) {
      axios
        .post(`${API}/campuses`, { name: campusName })
        .then((response) => {
          setCampuses([...campuses, response.data]);
        })
        .catch((error) => {
          console.error("Error creating campus:", error);
        });
    }
  };

  const handleCreateArea = () => {
    const areaName = prompt("Enter area name:");
    if (areaName && selectedCampus) {
      axios
        .post(`${API}/areas`, { name: areaName, campus: selectedCampus })
        .then((response) => {
          setAreas([...areas, response.data]);
        })
        .catch((error) => {
          console.error("Error creating area:", error);
        });
    }
  };

  const onCreatePoint = (point: Partial<Point>, img:string): void => {
    // Create the Image object
    const newImage = {
      base64: img,
    };
  
    // Create the Point object
    const newPoint: any = {
      ...point,
      campus: selectedCampus, //Ignore error
      area: selectedArea,
    };
  
    // Create the Image first
    axios
      .post('/images', newImage)
      .then((imageResponse) => {
        // Get the created Image's _id
        const imageId = imageResponse.data._id;
  
        // Assign the Image _id to the Point's image attribute
        newPoint.image = imageId;
  
        // Create the Point
        axios
          .post('/point', newPoint)
          .then((pointResponse) => {
            // Handle successful creation of the point
            console.log('Point created:', pointResponse.data);
          })
          .catch((error) => {
            // Handle error while creating the point
            console.error('Error creating point:', error);
          });
      })
      .catch((error) => {
        // Handle error while creating the image
        console.error('Error creating image:', error);
      });
  };
  

  return (
    <div>
      <h1>Virtual Tour</h1>
      <CampusSelect
        campuses={campuses}
        selectedCampus={selectedCampus}
        onSelectCampus={handleCampusChange}
        onCreateCampus={handleCreateCampus}
      />
      {selectedCampus && (
        <AreaSelect
          areas={areas}
          selectedArea={selectedArea}
          onSelectArea={handleAreaChange}
          onCreateArea={handleCreateArea}
        />
      )}
      {selectedImage && (
        <AreaView
          area={{
            _id: selectedArea,
            name: selectedArea,
            image: selectedImage,
          }}
          onCreatePoint={onCreatePoint}
          points={points}
        />
      )}
    </div>
  );
}

export default App;
