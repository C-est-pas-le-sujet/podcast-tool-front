import React, { useRef, useEffect } from "react";

import { secondsToMMSS } from "../services/date";

import logo from "./vignette.jpg";

const transformTitle = (title) => {
  let array = [];
  let tmp = [];
  const titleArray = title.split(" ");
  for (let i = 0; i < titleArray.length; i++) {
    tmp.push(titleArray[i]);
    if (tmp.join(" ").length >= 15) {
      array.push(tmp.join(" "));
      tmp = [];
    } else {
    }
  }
  return array;
};

const Export = ({ data, podcastId }) => {
  const $exportTimecode = useRef();
  const $thumbnail = useRef();
  const title = `${data.podcasts[podcastId].title} ${data.podcasts[podcastId].season.toString().padStart(2, "0")}x${data.podcasts[podcastId].episode
    .toString()
    .padStart(2, "0")}`;
  useEffect(() => {
    const canvas = $thumbnail.current;
    const ctx = canvas.getContext("2d");
    var background = new Image();
    background.src = logo;
    background.onload = function () {
      ctx.drawImage(background, 0, 0, 1000, 1000);
      ctx.font = "90px KeepCalm";
      ctx.textAlign = "center";
      console.log(title.length, transformTitle(title));
      transformTitle(title).forEach((text, i) => {
        ctx.fillText(text, 500, 700 + i * 100);
      });
    };
  }, [data, title]);

  return (
    <div className="export">
      <h2>Export</h2>
      <div className="export-summary" contentEditable>
        <h4>Titre</h4>
        {title}
        <h4>Description</h4>
        <p>Chapitres et timecodes : </p>
        {data.podcasts[podcastId].chapters
          .filter(({ startTime }) => startTime !== null)
          .map(({ name, startTime }, index) => (
            <p>
              {secondsToMMSS(startTime)} - {index + 1} : {name}
            </p>
          ))}
        <p>
          Vous pouvez retrouver tous nos podcasts et les différents plateformes sur Anchor : <a href="https://anchor.fm/cpls">https://anchor.fm/cpls</a> !{" "}
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
        <p>
          Un énorme merci à Martin Lavoine pour son travail sur le sound design du podcast grâce à son jingle, l'intro et les cuts ! Vous pouvez le retrouver
          sur <a href="https://www.facebook.com/MusicMartinLVN/">sa page Facebook </a>et{" "}
          <a href="https://open.spotify.com/artist/7LK6gSduL4GZ9ulTvclihc?si=7wgpIoZWRIC87Mb5Q4PTCA">sa page Spotify</a>.
        </p>
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
      <canvas width="1000" height="1000" ref={$thumbnail}></canvas>
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
