import React, { useState, useEffect } from "react";
import Chapter from "./Chapter";
import NewChapter from "./NewChapter";
import Player from "./Player";

import "./App.css";

const sounds = [
  {
    name: "jingle",
    duration: "00:23",
    path: "",
  },
  {
    name: "intro",
    duration: "00:23",
    path: "",
  },
  {
    name: "bed",
    duration: "00:10",
    path: "",
  },
  {
    name: "virgule",
    duration: "00:01",
    path: "",
  },
];

const App = () => {
  const [currentSound, setCurrentSound] = useState();
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState();
  const [chapters, setChapters] = useState([
    {
      name: "Intro",
      startTime: null,
      stopTime: null,
      author: "SH",
      notes: ["Lorem ipsum", "sit dolor", "amet"],
      current: false,
    },
    {
      name: "Apple vs Epic",
      startTime: null,
      stopTime: null,
      author: "John",
      notes: ["Lorem ipsum", "sit dolor", "amet"],
      current: false,
    },
    {
      name: "Tenet",
      startTime: null,
      stopTime: null,
      author: "John",
      notes: ["Lorem ipsum", "sit dolor", "amet"],
      current: false,
    },
    {
      name: "Mulan",
      startTime: null,
      stopTime: null,
      author: "John",
      notes: ["Lorem ipsum", "sit dolor", "amet"],
      current: false,
    },
    {
      name: "iPhone",
      startTime: null,
      stopTime: null,
      author: "John",
      notes: ["Lorem ipsum", "sit dolor", "amet"],
      current: false,
    },
  ]);

  useEffect(() => {
    setChapters(chapters.sort((a, b) => (a.startTime !== null ? a.startTime - b.startTime : 0)));
  }, [chapters]);

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <h3>Sounds</h3>
            {sounds.map(({ name, duration }) => (
              <div className="row" key={name}>
                <button
                  type="button"
                  className="btn btn-link col-md-12"
                  onClick={() => {
                    setCurrentSound(name);
                  }}
                >
                  <div className="row">
                    <div className="col-md-2">
                      <small className="text-muted">{duration}</small>
                    </div>
                    <div className="col-md-10">{name}</div>
                  </div>
                </button>
              </div>
            ))}
            <Player currentSound={currentSound} />
          </div>
          <div className="col-md-10">
            <h1>Podcast tool</h1>
            <h2>Apple vs Epic, Tenet 02x01</h2>
            <h3>{timer}</h3>
            {chapters[0].startTime === null && (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  setCurrentSound("jingle");
                  setChapters((prevChapters) => {
                    prevChapters[0].startTime = timer;
                    prevChapters[0].current = true;
                    return prevChapters;
                  });
                  setTimeout(() => {
                    setCurrentSound("bed");
                  }, 11000);
                  const myInt = setInterval(() => {
                    setTimer((prevTimer) => {
                      return prevTimer + 1;
                    });
                  }, 1000);
                  setTimerInterval(myInt);
                }}
              >
                Start
              </button>
            )}
            {chapters[0].startTime !== null && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  clearInterval(timerInterval);
                  console.log(chapters);
                  setChapters(
                    chapters.map((chapter) => {
                      chapter.current = false;
                      if (chapter.startTime === null) {
                        chapter.startTime = timer;
                      }
                      if (chapter.stopTime === null) {
                        chapter.stopTime = timer;
                      }
                      return chapter;
                    })
                  );
                  clearInterval(timerInterval);
                }}
              >
                Stop
              </button>
            )}
            <div className="row row-cols-2">
              {chapters.map(({ name, notes, startTime, stopTime, author, current }, index) => (
                <Chapter
                  key={name}
                  name={name}
                  notes={notes}
                  startTime={startTime}
                  stopTime={stopTime}
                  author={author}
                  index={index}
                  setCurrentSound={setCurrentSound}
                  setChapters={setChapters}
                  timer={timer}
                  current={current}
                  podcastStarted={chapters[0].startTime !== null}
                />
              ))}
              <NewChapter setChapters={setChapters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
