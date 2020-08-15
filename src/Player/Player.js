import React from "react";
import bed from "./sounds/bed.mp3";

const Player = ({ src }) => <audio src={bed} controls style={{ width: "100%" }} />;

export default Player;
