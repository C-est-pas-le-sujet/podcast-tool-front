import React, { useEffect, useRef } from "react";
import bed from "./sounds/bed.mp3";
import virgule from "./sounds/virgule.mp3";
import jingle from "./sounds/jingle.mp3";

const sounds = {
  bed,
  virgule,
  jingle,
};

const Player = ({ currentSound }) => {
  const $player = useRef(null);
  useEffect(() => {
    if (currentSound === "bed") {
      $player.current.volume = 0.5;
    } else {
      $player.current.volume = 1;
    }
    $player.current.play();
  }, [currentSound]);
  return (
    <>
      {currentSound && <h4>{currentSound}</h4>}
      <audio ref={$player} src={sounds[currentSound]} loop={currentSound === "bed"} controls style={{ width: "100%" }} />
    </>
  );
};

export default Player;
