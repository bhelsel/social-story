import Slide from "../components/Slide";
import classes from "./TitleSlide.module.css";

function TitleSlide({ title, text, image }) {
  return (
    <Slide className={classes.slideStyling}>
      <div className={classes.titleSlide}>
        {title.length < 20 ? <h2>{title}</h2> : <h3>{title}</h3>}
        {text ? <p>{text}</p> : null}
        <img src={image} alt={title}></img>
      </div>
    </Slide>
  );
}

export default TitleSlide;
