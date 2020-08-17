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
        Vous pouvez une nouvelle fois nous écouter sur Anchor : https://anchor.fm/techcast-podcast ! L’enregistrement s’est fait via discord, donc si vous
        souhaitez participer n’hésitez pas : http://discord.techcast.fr N'hésitez pas à nous faire vos retours grâce au hashtag #TechCast et nous retrouver sur
        twitter : Johnathan MEUNIER : @J7N__ Charles-Henri DUMALIN : @CallMeSH. Victor CHARTIER : @Chabarnak Merci également pour tous les partages et les
        abonnements. Matériels : Micro & pied : https://amzn.to/2Lweire Table de mixage : https://amzn.to/2Al0idg Enregistreur : https://amzn.to/2Lzoori iPad :
        https://amzn.to/2CTjyzT Bird UM1 : https://amzn.to/2vVAgyV Code Shadow : John : JOHHJWQB SH : CHANEOJH
      </div>
      <h3>Timecode</h3>
      <div className="export-timecode">Format pour l'export audacity / ffmpeg ?</div>
    </div>
  );
};

export default Export;
