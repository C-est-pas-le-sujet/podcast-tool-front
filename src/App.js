import React, { useState, useEffect } from "react";
import Chapter from "./Chapter";
import NewChapter from "./NewChapter";
import Player from "./Player";
import SelectPodcast from "./SelectPodcast";
import Export from "./Export";

import { secondsToMMSS } from "./services/date";

import data from "./data.json";

import "./App.scss";

const App = () => {
  const [currentSound, setCurrentSound] = useState();
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState();
  const [podcastId, setPodcastId] = useState(null);
  const [chapters, setChapters] = useState(podcastId !== null ? data.podcasts[podcastId].chapters : []);

  useEffect(() => {
    setChapters(chapters.sort((a, b) => (a.startTime !== null ? a.startTime - b.startTime : 0)));
    localStorage.setItem("chapters", JSON.stringify(chapters));
  }, [chapters]);

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sounds">
            <Player currentSound={currentSound} />
          </div>

          <div className="col-md-10 podcast">
            <h1>Podcast tool</h1>
            <div className="row">
              <div className="col-md-6 offset-md-3 select-podcast">
                <SelectPodcast podcastId={podcastId} setPodcastId={setPodcastId} setChapters={setChapters} data={data} />
              </div>
              <div className="timer">
                <h3>{secondsToMMSS(timer)}</h3>
              </div>
            </div>
            {podcastId !== null && (
              <>
                <h2>Record</h2>
                <div className="row actions">
                  {chapters[0].startTime === null && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setCurrentSound("intro");
                        setChapters((prevChapters) => {
                          prevChapters[0].startTime = timer;
                          prevChapters[0].current = true;
                          return prevChapters;
                        });
                        setTimeout(() => {
                          setCurrentSound("bed");
                        }, 7000);
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
                        setTimer(0);
                        setChapters(
                          chapters.map((chapter) => {
                            chapter.current = false;
                            return chapter;
                          })
                        );
                        clearInterval(timerInterval);
                      }}
                    >
                      Stop
                    </button>
                  )}
                </div>
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
                <Export data={data} podcastId={podcastId} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
