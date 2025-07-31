import classes from "./GoogleMap.module.css";

function GoogleMap({ location, link }) {
  return (
    <div className={classes.mapContainer}>
      <div className={classes.mapWrapper}>
        <iframe
          title={location}
          src={link}
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
export default GoogleMap;
