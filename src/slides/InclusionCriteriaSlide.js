import Slide from "../components/Slide";
import classes from "./InclusionCriteriaSlide.module.css";

function InclusionCriteriaSlide({ title, criteria }) {
  return (
    <Slide className={classes.InclusionCriteriaSlide}>
      <h2>{title}</h2>
      <ul>
        {criteria.map((criterion) => (
          <li key={criterion}>
            <p>{criterion}</p>
          </li>
        ))}
      </ul>
    </Slide>
  );
}

export default InclusionCriteriaSlide;
