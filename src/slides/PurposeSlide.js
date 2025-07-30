import Slide from "../components/Slide";
import classes from "./PurposeSlide.module.css";

function PurposeSlide({ title, text }) {
  return (
    <Slide className={classes.slideStyling}>
      <h2>{title}</h2>
      <p>{text}</p>
    </Slide>
  );
}

export default PurposeSlide;
