import { useState, useEffect } from "react";
import './App.css'
import audioData from './assets/data.json'


function App() {
  const [displayString, setDisplayString] = useState<string>('');

  const playAudio = (audioId: string) => {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
    setDisplayString(audioElement.parentElement?.innerText || '');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const audioId = e.key.toUpperCase();
      if (audioId) {
        playAudio(audioId);
      }
    };

    const padElement = document.getElementById("drum-machine");
    if (padElement) {
      padElement.tabIndex = 0; 
      padElement.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (padElement) {
        padElement.removeEventListener("keypress", handleKeyPress);
        padElement.tabIndex = -1; 
      }
    };
  }, []);

  return (
    <>
      <div id="drum-machine">
        <div id="display">
          <h1>Display</h1>
          <h1>{displayString}</h1>
        </div>
        <div className="pad-grid">
          {audioData.map((audio, i) => (
            <button
              key={i}
              className="drum-pad"
              id={audio.id}
              onClick={() => playAudio(audio.text)}
            >
              {audio.text}{" "}
              <audio src={audio.src} className="clip" id={audio.text}></audio>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
