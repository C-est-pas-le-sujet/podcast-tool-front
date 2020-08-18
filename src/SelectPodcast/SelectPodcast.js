import React from "react";

const NewChapter = ({ podcastId, setPodcastId, setChapters, data }) => {
  return (
    <>
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
          <option value={index} key={title}>
            {title} {season}x{episode}
          </option>
        ))}
      </select>
    </>
  );
};

export default NewChapter;
