import { Link } from "react-router-dom";

import classes from "./StudiesList.module.css";
import studies from "../data/studies.json";

function StudyList() {
  return (
    <div className={classes.studyList}>
      <ul>
        {studies.map((study) => (
          <li key={study.id}>
            <img src={study.image} alt={study.id} />
            <Link to={`${study.id}`}>
              <h2>{study.id}</h2>
            </Link>
            <p>{study.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyList;
