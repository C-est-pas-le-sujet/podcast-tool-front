import React, { useEffect, useRef } from "react";
import bed from "./sounds/bed.mp3";
import virgule from "./sounds/virgule.mp3";
import jingle from "./sounds/jingle.mp3";

const sounds = [
  {
    name: "jingle",
    sound: jingle,
  },
  {
    name: "bed",
    sound: bed,
  },
  {
    name: "virgule",
    sound: virgule,
  },
];

const Player = ({ currentSound = "virgule" }) => {
  const $players = useRef({});
  useEffect(() => {
    Object.entries($players.current).forEach(([name, sound]) => {
      if (name === "bed") {
        sound.volume = 0.5;
      }
      sound.pause();
      sound.currentTime = 0;
    });
    $players.current[currentSound.substring(0, currentSound.includes("-") ? currentSound.indexOf("-") : currentSound.length)].play();
  }, [currentSound]);

  return (
    <>
      <h3>Sounds</h3>
      {sounds.map(({ sound, name }) => (
        <div key={name}>
          <h5>{name}</h5>
          <audio ref={(el) => ($players.current[name] = el)} preload="auto" src={sound} loop={name === "bed"} controls style={{ width: "100%" }} />
        </div>
      ))}
    </>
  );
};

export default Player;
