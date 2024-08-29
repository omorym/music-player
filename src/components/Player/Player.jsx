import React, { useState, useRef, useEffect } from "react";
import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MEGALOVANIA from "../../assets/MEGALOVANIA.mp3";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import megalovania from "../../assets/megalovania.jpg";

const Player = () => {
  const [Playing, setPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const togglePlay = () => {
    if (Playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!Playing);
  };
  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    audioRef.current.loop = !isRepeat;
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const updateProgress = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleProgressClick = (event) => {
    const { clientX } = event;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const newTime = (offsetX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);
  return (
    <div className="player">
      <div className="player-options">
        <img src={megalovania} alt="Player Option" className="music-img" />
        <h2>MEGALOVANIA</h2>
        <p>Toby Fox</p>
      </div>
      <div className="player-controls">
        <div className="control-separator">
          <button className="control-button" onClick={toggleRepeat}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#ffffff" }} />
          </button>
          <button className="control-button" onClick={handleBackward}>
            <FontAwesomeIcon icon={faBackward} style={{ color: "#ffffff" }} />
          </button>
          <button onClick={togglePlay} className="play-button">
            <FontAwesomeIcon
              icon={Playing ? faPause : faPlay}
              style={{ color: "#000000" }}
            />
          </button>
          <button className="control-button" onClick={handleForward}>
            <FontAwesomeIcon icon={faForward} style={{ color: "#ffffff" }} />
          </button>
          <button className="control-button" onClick={toggleShuffle}>
            <FontAwesomeIcon icon={faShuffle} style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>

      <div
        className="progress-bar"
        ref={progressBarRef}
        onClick={handleProgressClick}
      >
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <audio ref={audioRef} src={MEGALOVANIA} preload="metadata" />
    </div>
  );
};

export default Player;
