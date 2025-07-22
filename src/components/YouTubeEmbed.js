import classes from "./YouTubeEmbed.module.css";

function YouTubeEmbed({ videoId }) {
  return (
    <div className={classes.videoContainer}>
      <div className={classes.videoWrapper}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default YouTubeEmbed;
