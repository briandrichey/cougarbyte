import React, { useState } from 'react';

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [r, setR] = useState(null);
  const [g, setG] = useState(null);
  const [b, setB] = useState(null);
  const [data, setData] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (event) => {
    const img = document.getElementById('uploaded-image');
    const rect = img.getBoundingClientRect();

    const mouseX = Math.floor(event.clientX - rect.left);
    const mouseY = Math.floor(event.clientY - rect.top);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const pixelData = ctx.getImageData(mouseX, mouseY, 1, 1).data;

    setX(mouseX);
    setY(img.height - mouseY);
    setR(pixelData[0]);
    setG(pixelData[1]);
    setB(pixelData[2]);
  };

  const handleClick = () => {
    setData({ x: x, y: x, r: r, g: g, b: b });
    const newData = {
        id: data.length + 1,
        x: x,
        y: y,
        r: r,
        g: g,
        b: b
    };
    console.log(data);
    setData([...data, newData]);
  };
  

  const handleExportData = () => {
    const dataStr = JSON.stringify(data);
    const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = 'data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div>
      <input type="file" accept="image/jpeg" onChange={handleImageUpload} />
      {imageSrc && (
        <div>
          <img
            id="uploaded-image"
            src={imageSrc}
            alt="Uploaded"
            onMouseMove={handleMouseMove}
            onClick = {handleClick}
          />
          <div>
            X: {x}, Y: {y}, RGB: ({r}, {g}, {b})
          </div>
          <div>
      <button onClick={handleExportData}>Export Data</button>
    </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

