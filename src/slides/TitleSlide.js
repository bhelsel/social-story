import Slide from "../components/Slide";
import classes from "./TitleSlide.module.css";

function TitleSlide({ title, text, image }) {
  return (
    <Slide
      style={{ backgroundColor: "#f3f4f6", fontSize: "1.2rem" }}
      textColor="#1f2937"
      padding="1rem"
    >
      <div className={classes.titleSlide}>
        <h2>{title}</h2>
        {text ? (
          <p>{text}</p>
        ) : (
          <p>{`A Social Story for the ${title} study.`}</p>
        )}
        <img src={image} alt={title}></img>
      </div>
    </Slide>
  );
}

export default TitleSlide;
