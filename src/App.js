import React, { useState, useEffect } from "react";
import Chapter from "./Chapter";
import NewChapter from "./NewChapter";
import Player from "./Player";
import data from "./data.json";

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
  const [podcastId, setPodcastId] = useState(null);
  const [chapters, setChapters] = useState(podcastId !== null ? data.podcasts[podcastId].chapters : []);

  useEffect(() => {
    setChapters(chapters.sort((a, b) => (a.startTime !== null ? a.startTime - b.startTime : 0)));
  }, [chapters]);

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sounds">
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

          <div className="col-md-10 podcast">
            <h1>Podcast tool</h1>
            <h2>Select podcast</h2>
            <select
              className="form-group form-control"
              value={podcastId}
              onChange={(e) => {
                setPodcastId(e.target.value);
                setChapters(data.podcasts[e.target.value].chapters);
              }}
            >
              <option value={null}>Select a podcast</option>
              {data.podcasts.map(({ title, season, episode }, index) => (
                <option value={index}>
                  {title} {season}x{episode}
                </option>
              ))}
            </select>
            {podcastId !== null && (
              <>
                <h2>
                  {data.podcasts[podcastId].title} {data.podcasts[podcastId].season}x{data.podcasts[podcastId].episode}
                </h2>
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
                <div className="export">
                  <h3>Summary</h3>
                  <div className="export-summary">
                    <h4>Titre</h4>
                    {data.podcasts[podcastId].title} {data.podcasts[podcastId].season}x{data.podcasts[podcastId].episode}
                    <h4>Description</h4>
                    Hello ! Début de la description
                    {data.podcasts[podcastId].chapters.map(({ name, startTime }) => (
                      <p>
                        {startTime} - {name}
                      </p>
                    ))}
                    Fin de la description
                  </div>
                  <h3>Timecode</h3>
                  <div className="export-timecode">Format pour l'export audacity / ffmpeg ?</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
