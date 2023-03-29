import './App.css';
import ImageUploader from './ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Insert an image below to use the RGB data scraper.
        </h2>
        <ImageUploader></ImageUploader>
      </header>
    </div>
  );
}

export default App;
