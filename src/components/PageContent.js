import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={classes.pageContent}>
      <h1>{title}</h1>
      {children}
      <div className={classes.videoContainer}>
        <div className={classes.videoWrapper}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/UMoSnfFzAHw?si=kr4JUAnOkXkGGo35"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default PageContent;
