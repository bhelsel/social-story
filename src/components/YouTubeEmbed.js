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
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default YouTubeEmbed;
