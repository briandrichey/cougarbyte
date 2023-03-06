import React, { useState } from 'react';
import './App.css';

function App() {
  // Image Handling
  const [userImage, setuserImage] = useState(null);
  const imageUpload = (e) => {
    document.getElementById('uploadControl').classList.add('hidden');
    document.getElementById('imgContainer').classList.remove('hidden');
    setuserImage(URL.createObjectURL(e.target.files[0]));
  }

  // Cursor Handling
  const handleImageHover = (e) => {
    let cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', function(e){
      let x = e.clientX;
      let y = e.clientY;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    })
    e.target.style.cursor = 'none';
    //e.target.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'white\'%3E%3Ccircle cx=\'5\' cy=\'5\' r=\'4\'/%3E%3C/svg%3E") 8 8, auto';
  };

  const handleImageLeave = (e) => {
    e.target.style.cursor = 'auto';
  };


  // HTML Code
  return (
    <div className="App">
      <div id='uploadControl' className='mx-auto text-center'>
        <label>Upload Image</label>
        <br />
        <input type="file" onChange={imageUpload} />
      </div>
      <div id = "cursor"></div>
      <div id="imgContainer" className='m-2 text-center hidden' >
        {userImage && (<img className='mx-auto' src={userImage} alt="Upload" onMouseOver={handleImageHover} 
        onMouseLeave={handleImageLeave} />)}
        <p>
          <label>Circle 1</label>
          <input type="range" min="1" max="100" class="slider" id="sliderOne" />
        </p>
        <p>
          <label>Circle 2</label>
          <input type="range" min="1" max="100" class="slider" id="sliderTwo" />
        </p>
      </div>
    </div>
  );
}

export default App;
