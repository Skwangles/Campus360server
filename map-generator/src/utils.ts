function getBase64(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target?.result);
    };
    reader.readAsDataURL(file);
  });
}

export default getBase64;
