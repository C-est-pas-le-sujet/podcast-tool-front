import React from "react";

const Chapter = ({ index, author, name, notes, startTime }) => (
  <div className="col mb-4">
    <div className="card">
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
          {startTime === null && (
            <button type="button" className="btn btn-success">
              Start
            </button>
          )}
          {startTime !== null && <span>03:42</span>}
        </div>
      </div>
      <div className="card-footer">
        {startTime === null && <small className="text-muted">Not started yet</small>}
        {startTime && <small className="text-muted">Started at {startTime}</small>}
      </div>
    </div>
  </div>
);

export default Chapter;
