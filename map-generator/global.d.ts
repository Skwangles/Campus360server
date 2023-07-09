export {};

declare global {
  interface Campus {
    _id: string;
    name: string;
  }

  type CampusSelectProps = {
    setCampus: (campusId: string) => void;
  };
}
