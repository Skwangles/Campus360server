import React from "react";
import { Pannellum } from "pannellum-react";
import getBase64 from "./utils";

const PanoramaViewer = async ({ file }: { file: File }) => {
  const base64 = await getBase64(file);

  return (
    <div style={{ width: "50%", height: "500px" }}>
      <Pannellum
        width="100%"
        height="100%"
        image={base64}
        autoLoad
        showZoomCtrl={false}
        showFullscreenCtrl={false}
        onLoad={() => console.log("Panorama loaded!")}
      />
    </div>
  );
};

export default PanoramaViewer;
