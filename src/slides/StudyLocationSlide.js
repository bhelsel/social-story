import { useState } from "react";
import Slide from "../components/Slide";
import GoogleMap from "../components/GoogleMap.js";
import classes from "./StudyLocationSlide.module.css";
import locations from "../data/locations.json";

function StudyLocationSlide({ title, location }) {
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'image'

  const locationData = locations.find((loc) => loc.location === location);

  return (
    <Slide className={classes.studyLocationSlide}>
      {/* Header Section */}
      <div className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
      </div>

      {/* Toggle Buttons */}
      <div className={classes.toggleContainer}>
        <button
          className={`${classes.toggleButton} ${
            viewMode === "map" ? classes.active : ""
          }`}
          onClick={() => setViewMode("map")}
        >
          <span className={classes.toggleIcon}>🗺️</span>
          Map View
        </button>
        <button
          className={`${classes.toggleButton} ${
            viewMode === "image" ? classes.active : ""
          }`}
          onClick={() => setViewMode("image")}
        >
          <span className={classes.toggleIcon}>📸</span>
          Photo View
        </button>
      </div>

      {/* Content Area */}
      <div className={classes.contentContainer}>
        {/* Map View */}
        {viewMode === "map" && (
          <div className={`${classes.viewContainer} ${classes.mapView}`}>
            <div className={classes.mapContainer}>
              <GoogleMap location={location} link={locationData.link} />
            </div>
          </div>
        )}

        {/* Image View */}
        {viewMode === "image" && (
          <div className={`${classes.viewContainer} ${classes.imageView}`}>
            <div className={classes.imageContainer}>
              <img
                src={locationData.image}
                alt={title}
                className={classes.locationImage}
              />
            </div>
          </div>
        )}
      </div>
    </Slide>
  );
}

export default StudyLocationSlide;
