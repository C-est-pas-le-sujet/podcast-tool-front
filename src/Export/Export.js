import React, { useRef, useEffect } from "react";

import { secondsToMMSS } from "../services/date";

const Export = ({ data, podcastId }) => {
  const $exportTimecode = useRef();
  const $thumbnail = useRef();
  const title = `${data.podcasts[podcastId].title} ${data.podcasts[podcastId].season}x${data.podcasts[podcastId].episode}`;
  useEffect(() => {
    console.log($thumbnail);
    const canvas = $thumbnail.current;
    const ctx = canvas.getContext("2d");
    var background = new Image();
    background.src =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techcastglobal.com%2Fwp-content%2Fuploads%2F2016%2F04%2FTechCast_Logo_Vertical_Slogan-300x252.jpg&f=1&nofb=1";
    background.onload = function () {
      ctx.drawImage(background, 0, 0);
      ctx.font = "30px Arial";
      ctx.fillText(title, 10, 50);
    };
  }, [data, title]);

  return (
    <div className="export">
      <h2>Export</h2>
      <div className="export-summary" contentEditable>
        <h4>Titre</h4>
        {title}
        <h4>Description</h4>
        Hello ! Début de la description
        <p>Chapitres et timecodes : </p>
        {data.podcasts[podcastId].chapters
          .filter(({ startTime }) => startTime !== null)
          .map(({ name, startTime }, index) => (
            <p>
              {secondsToMMSS(startTime)} - {index + 1} : {name}
            </p>
          ))}
        <p>
          Vous pouvez retrouver tous nos podcasts et les différents plateformes sur Anchor :{" "}
          <a href="https://anchor.fm/techcast-podcast">https://anchor.fm/techcast-podcast</a> !{" "}
        </p>
        <p>L’enregistrement se fait via discord, donc si vous souhaitez participer n’hésitez pas : http://discord.techcast.fr </p>
        <p>N'hésitez pas non plus à nous faire vos retours grâce au hashtag #CPLS et nous retrouver sur twitter :</p>
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
      </div>
      <h3>Vignette</h3>
      <canvas width="600" height="600" ref={$thumbnail}></canvas>
      <h3>
        Timecode{" "}
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
      </h3>

      <pre className="export-timecode" ref={$exportTimecode}>
        {data.podcasts[podcastId].chapters
          .filter(({ startTime }) => startTime !== null)
          .map(({ name, startTime, stopTime }, i) => (
            <p>
              {startTime}.000000&#9;{stopTime}.000000&#9;{(i + 1 + "").padStart(2, "0")} - {name}
            </p>
          ))}
      </pre>
    </div>
  );
};

export default Export;
