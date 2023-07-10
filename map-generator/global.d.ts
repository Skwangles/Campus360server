export {};

declare global {
  type UUID = string;

  type Campus = {
    _id?: string;
    name: string;
  }

  type Image = {
    _id?: string;
    base64: string
  }

  type PointType = {
    _id?: string;
    name: string;
  }

  type CampusSelectProps = {
    setCampus: (campusId: string) => void;
  };

  type Area = {
    _id?: string;
    name: string;
    image: Image;
    campus?: Campus;
  }
  
  type Point = {
    _id?: string;
    image?: Image;
    pan_offset: number;
    tilt_offset: number;
    type: PointType;
    x: number;
    y: number;
    links?: Point[];
  }

  type Room = {
    _id?: string;
      name: string;
      occupants: string;
      points?: Point[];
  }
}
