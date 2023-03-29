import React, { useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";


const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null); // empty state variable for the image
  const [x, setX] = useState(null); //empty state variable for the x axis value
  const [y, setY] = useState(null); //empty state variable for the y axis value
  const [r, setR] = useState(null); //empty state variable for the red pixel value
  const [g, setG] = useState(null); //empty state variable for the green pixel value
  const [b, setB] = useState(null); //empty state variable for the blue pixel value
  const [data, setData] = useState([]); //empty state array variable for the click data to be stored and exported


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

  const handleDelete = (id) => {
    const newData = data.filter(li => li.id !== id);
    setData(newData);
  }

  return (
    <div>
      <div id="file-button">
        <input id="button" type="file" accept="image/jpeg" onChange={handleImageUpload} />
        <label for="button"></label>
      </div>
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
          <br/>
          <div> 
            <table>
              <tr>
               <th>
                  x
                </th>
                <th>
                  y
                </th>
                <th>
                  RGB
                </th>
                </tr>
            {data.map(data => (
                <tr>
                  <td>{data.x}</td>
                  <td>{data.y}</td>
                <td>{data.r}, {data.g}, {data.b}</td>
                <td>
                  <button id="del-button" onClick={() => handleDelete(data.id)}><TiDeleteOutline id="del-icon"/></button>
                </td>
                </tr>
            ))} 
            </table>
            

        <button id="export-button" onClick={handleExportData}>Export Data</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

