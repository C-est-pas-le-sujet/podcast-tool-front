import React from "react";

const Export = ({ data, podcastId }) => {
  return (
    <div className="export" contentEditable>
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
  );
};

export default Export;
