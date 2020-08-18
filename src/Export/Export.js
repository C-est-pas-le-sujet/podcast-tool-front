import React, { useRef } from "react";

import { secondsToMMSS } from "../services/date";

const Export = ({ data, podcastId }) => {
  const $exportTimecode = useRef();
  return (
    <div className="export">
      <h3>Summary</h3>
      <div className="export-summary" contentEditable>
        <h4>Titre</h4>
        {data.podcasts[podcastId].title} {data.podcasts[podcastId].season}x{data.podcasts[podcastId].episode}
        <h4>Description</h4>
        Hello ! Début de la description
        {data.podcasts[podcastId].chapters.map(({ name, startTime }) => (
          <p>
            {secondsToMMSS(startTime)} - {name}
          </p>
        ))}
        <p>
          Vous pouvez retrouver tous nos podcasts et les différents plateformes sur Anchor :{" "}
          <a href="https://anchor.fm/techcast-podcast">https://anchor.fm/techcast-podcast</a> !{" "}
        </p>
        <p>L’enregistrement se fait via discord, donc si vous souhaitez participer n’hésitez pas : http://discord.techcast.fr </p>
        <p>
          N'hésitez pas non plus à nous faire vos retours grâce au hashtag #CPLS et nous retrouver sur twitter :
          <ul>
            <li>
              Johnathan MEUNIER : <a href="https://twitter.com/J7N__">@J7N__</a>
            </li>
            <li>
              Charles-Henri DUMALIN : <a href="https://twitter.com/CallMeSH">@CallMeSH</a>
            </li>
          </ul>
          <p>Merci également pour tous les partages et les abonnements. </p>
          <p>Matériels : </p>
          <ul>
            <li>
              Micro & pied : <a href="https://amzn.to/2Lweire">https://amzn.to/2Lweire</a>
            </li>
            <li>
              Table de mixage : <a href="https://amzn.to/2Al0idg">https://amzn.to/2Al0idg</a>
            </li>
            <li>
              Enregistreur : <a href="https://amzn.to/2Lzoori">https://amzn.to/2Lzoori</a>
            </li>
            <li>
              iPad : <a href="https://amzn.to/2CTjyzT">https://amzn.to/2CTjyzT</a>
            </li>
            <li>
              Bird UM1 : <a href="https://amzn.to/2vVAgyV">https://amzn.to/2vVAgyV</a>
            </li>
          </ul>
          <p>Code Shadow :</p>
          <ul>
            <li>John : JOHHJWQB</li>
            <li>SH : CHANEOJH</li>
          </ul>
        </p>
      </div>
      <h3>Timecode</h3>
      <button
        className="btn btn-info"
        onClick={() => {
          const el = document.createElement("textarea");
          el.value = $exportTimecode.current.innerText;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        }}
      >
        Copy Timecode
      </button>
      <pre className="export-timecode" ref={$exportTimecode}>
        {data.podcasts[podcastId].chapters.map(({ name, startTime, stopTime }, i) => (
          <p>
            {startTime}.000000&#9;{stopTime}.000000&#9;{(i + 1 + "").padStart(2, "0")} - {name}
          </p>
        ))}
      </pre>
    </div>
  );
};

export default Export;
