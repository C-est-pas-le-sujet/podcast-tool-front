import React, { useState } from "react";

const NewChapter = ({ setChapters }) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState([]);
  const [author, setAuthor] = useState("");
  const [newNote, setNewNote] = useState("");
  return (
    <div className="col mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">New chapter</h5>
          <form>
            <input type="text" class="form-control form-group" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" class="form-control form-group" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <ul>
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="row">
              <input
                type="text"
                class="form-control form-group col-md-11"
                placeholder={`New note`}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button
                className="btn btn-info col-md-1"
                type="button"
                onClick={() =>
                  setNotes(() => {
                    setNewNote("");
                    return [...notes, newNote];
                  })
                }
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setChapters((prevChapters) => [
                  ...prevChapters,
                  {
                    name,
                    startTime: null,
                    stopTime: null,
                    author,
                    notes,
                    current: false,
                  },
                ]);
                setNotes([]);
                setName("");
                setNewNote("");
              }}
            >
              Add
            </button>
            <button
              type="reset"
              className="btn btn-error"
              onClick={() => {
                setNotes([]);
                setName("");
                setNewNote("");
              }}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewChapter;
