import React, { useState, useRef } from 'react';

interface Props {
  area: Area;
  points: Point[];
  onCreatePoint: (point: Partial<Point>, img: string) => void;
}

function AreaView({ area, points, onCreatePoint }: Props) {
  const [creatingPoint, setCreatingPoint] = useState<boolean>(false);
  const [imagePosition, setImagePosition] = useState({ left: 0, top: 0 });
  const [pointCoordinates, setPointCoordinates] = useState<{ x: number; y: number } | null>(null);
  const [newPointData, setNewPointData] = useState<Partial<Point>>({});
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (creatingPoint && imageRef.current) {
      const { left, top } = imageRef.current.getBoundingClientRect();
      const x = ((event.clientX - left) / imageRef.current.offsetWidth) * 100;
      const y = ((event.clientY - top) / imageRef.current.offsetHeight) * 100;
      setPointCoordinates({ x, y });
      setNewPointData({ ...newPointData, x, y });
    }
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  return (
    <div>
      <h2>{area.name}</h2>
      <img
        src={area.image.base64}
        alt={area.name}
        onClick={handleImageClick}
        onLoad={handleImageLoad}
        style={{ cursor: creatingPoint ? 'crosshair' : 'auto' }}
        ref={imageRef}
      />

      {points.map((point) => (
        <div
          key={point._id}
          style={{
            position: 'absolute',
            left: `${imagePosition.left + (point.x * imageRef.current?.offsetWidth) / 100}px`,
            top: `${imagePosition.top + (point.y * imageRef.current?.offsetHeight) / 100}px`,
          }}
        >
          {point.type.name}
        </div>
      ))}

      {creatingPoint && pointCoordinates && (
        <div>
          <input
            type="text"
            name="image"
            value={newPointData.image?.base64 || area.image?.base64}
            onChange={handleInputChange}
            placeholder="Image (base64)"
          />
          <input
            type="number"
            name="pan_offset"
            value={newPointData.pan_offset || 0}
            onChange={handleInputChange}
            placeholder="Pan Offset"
          />
          <input
            type="number"
            name="tilt_offset"
            value={newPointData.tilt_offset || 0}
            onChange={handleInputChange}
            placeholder="Tilt Offset"
          />
          <input
            type="text"
            name="type"
            value={newPointData.type?.name || ''}
            onChange={handleInputChange}
            placeholder="Type"
          />
          <input
            type="number"
            name="x"
            value={newPointData.x || pointCoordinates.x}
            onChange={handleInputChange}
            placeholder="X"
          />
          <input
            type="number"
            name="y"
            value={newPointData.y || pointCoordinates.y}
            onChange={handleInputChange}
            placeholder="Y"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleCreatePoint}>Create Point</button>
        </div>
      )}

      <button onClick={() => setCreatingPoint(!creatingPoint)}>
        {creatingPoint ? 'Cancel Creating Point' : 'Create Point'}
      </button>
    </div>
  );
}

export default AreaView;
