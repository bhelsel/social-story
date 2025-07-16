import classes from "./StudyContent.module.css";
import { Link, Outlet } from "react-router-dom";

function StudyContent({ study }) {
  return (
    <div className={classes.content}>
      <h1>{study.id}</h1>
      <p>{study.title}</p>
      {/* <img src={study.image} alt={study.id} /> */}
      <div>
        <p>{study.description}</p>
      </div>
      <nav>
        <ul>
          <li className={classes.item}>
            <Link to={`/studies/${study.id}/presentations`}>
              View Social Story
            </Link>
          </li>
          <li className={classes.item}>
            <Link to={`/studies/${study.id}/assessments`}>
              View Assessments
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default StudyContent;
