import React from "react";

import { secondsToMMSS } from "../services/date";

import "./Chapter.scss";

const Chapter = ({ index, author, name, notes, startTime, stopTime, setCurrentSound, setChapters, timer, current, podcastStarted }) => {
  const duration = (current ? timer : stopTime) - startTime;
  return (
    <div className="col mb-4">
      <div className={`card ${current ? "card--current" : null}`}>
        <div className="card-body row">
          <div className="col-md-1">
            <div className="row">
              <div className="col-md-12">
                <span className="badge badge-primary">{index + 1}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <span className="badge badge-pill badge-primary">{author}</span>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h5 className="card-title">{name}</h5>
            <ul>
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            {startTime === null && podcastStarted && (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  setCurrentSound(`virgule-${timer}`);
                  setChapters((prevChapters) => {
                    prevChapters[prevChapters.findIndex(({ current }) => current)].stopTime = timer;
                    prevChapters = prevChapters.map((chapter) => {
                      chapter.current = false;
                      return chapter;
                    });
                    prevChapters[index].current = true;
                    prevChapters[index].startTime = timer;
                    return prevChapters;
                  });
                }}
              >
                Start
              </button>
            )}
          </div>
        </div>
        <div className="card-footer">
          {startTime === null && <small className="text-muted">Not started yet</small>}
          {startTime !== null && (
            <>
              <small className="text-muted">
                <span>Started at {secondsToMMSS(startTime)} - </span>
                {stopTime && !current && <span>Stoped at {secondsToMMSS(stopTime)} - </span>}
                <span>Duration : {secondsToMMSS(duration)}</span>
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
