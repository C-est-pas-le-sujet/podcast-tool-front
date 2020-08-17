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
    if (currentSound === "bed") {
      $players.current[currentSound].volume = 0.5;
    } else {
      $players.current[currentSound].volume = 1;
    }
    $players.current[currentSound].play();
  }, [currentSound]);

  return (
    <>
      <h3>Sounds</h3>
      {sounds.map(({ sound, name }) => (
        <>
          <h5>{name}</h5>
          <audio ref={(el) => ($players.current[name] = el)} preload src={sound} loop={name === "bed"} controls style={{ width: "100%" }} />
        </>
      ))}
    </>
  );
};

export default Player;
