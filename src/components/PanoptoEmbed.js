import classes from "./PanoptoEmbed.module.css";

function PanoptoPlayer({ videoId }) {
  return (
    <div className={classes.videoContainer}>
      <div className={classes.videoWrapper}>
        <iframe
          src={`https://kumc.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=${videoId}&autoplay=false&offerviewer=true&showtitle=false&showbrand=true&captions=true&interactivity=all`}
          title="Panopto video player"
          height="405"
          width="720"
          allowFullScreen
          allow="autoplay"
          aria-label="Panopto Embedded Video Player"
        ></iframe>
      </div>
    </div>
  );
}

export default PanoptoPlayer;
