import React from "react";
import Chapter from "./Chapter";
import Player from "./Player";
import "./App.css";

const chapters = [
  {
    name: "Intro",
    startTime: "00:00",
    author: "SH",
    notes: ["Lorem ipsum", "sit dolor", "amet"],
  },
  {
    name: "Apple vs Epic",
    startTime: "00:00",
    author: "John",
    notes: ["Lorem ipsum", "sit dolor", "amet"],
  },
  {
    name: "Tenet",
    startTime: null,
    author: "John",
    notes: ["Lorem ipsum", "sit dolor", "amet"],
  },
];

const sounds = [
  {
    name: "Jingle",
    duration: "00:23",
    path: "",
  },
  {
    name: "Intro",
    duration: "00:23",
    path: "",
  },
  {
    name: "Bed",
    duration: "00:10",
    path: "",
  },
  {
    name: "Virgule",
    duration: "00:01",
    path: "",
  },
];

const App = () => (
  <div className="App">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <h3>Sounds</h3>
          {sounds.map(({ name, duration }) => (
            <div className="row" key={name}>
              <button type="button" className="btn btn-link col-md-12">
                <div className="row">
                  <div className="col-md-2">
                    <small className="text-muted">{duration}</small>
                  </div>
                  <div className="col-md-10">{name}</div>
                </div>
              </button>
            </div>
          ))}
          <Player src="bed" />
        </div>
        <div className="col-md-10">
          <h1>Podcast tool</h1>
          <h2>Apple vs Epic, Tenet 02x01</h2>
          <h3>07:42</h3>
          {chapters[0].startTime === null && (
            <button type="button" className="btn btn-success">
              Start
            </button>
          )}
          {chapters[0].startTime !== null && (
            <button type="button" className="btn btn-danger">
              Stop
            </button>
          )}
          <div className="row row-cols-1">
            {chapters.map(({ name, notes, startTime, author }, index) => (
              <Chapter key={name} name={name} notes={notes} startTime={startTime} author={author} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
