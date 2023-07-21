import * as PANOLENS from "panolens";
import getBase64 from "./utils";
const Pano = async (props: { point?: Point; file?: File; links: [Point] }) => {
  let base64 = "";
  if (props.point?.image?.base64) {
    base64 = props.point?.image?.base64;
  } else if (props.file) {
    base64 = await getBase64(props.file);
    console.log(base64);
  } else {
    // TODO: Load default image
    return (
      <>
        <div>No image provided.</div>
      </>
    );
  }

  const panorama = new PANOLENS.ImagePanorama(base64);

  const linksPanoramas =
    props.links?.map((link) => {
      return new PANOLENS.ImagePanorama(link.image?.base64);
    }) || [];

  const viewer = new PANOLENS.Viewer({
    container: document.getElementById("pano"),
  });
  viewer.add(panorama);

  // link any linked points
  for (const linkPanorama of linksPanoramas) {
    viewer.add(linkPanorama);
    panorama.link(linkPanorama, new PANOLENS.Vector3(0, 0, 0)); // one-way link, as the we
  }

  return (
    <>
      <div id="pano"></div>
    </>
  );
};

export default Pano;
