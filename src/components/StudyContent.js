import classes from "./StudyContent.module.css";
import { Link, Outlet } from "react-router-dom";

function StudyContent({ study }) {
  return (
    <div className={classes.content}>
      <header className={classes.header}>
        <h1 className={classes.studyId}>{study.id}</h1>
        <h2 className={classes.studyTitle}>{study.title}</h2>
        <div className={classes.studyDescription}>
          <p>{study.description}</p>
        </div>
      </header>

      <nav className={classes.navigation}>
        <ul className={classes.studyContent}>
          <li>
            <Link to={`/studies/${study.id}/presentations`}>
              View Social Story
            </Link>
          </li>
          <li>
            <Link to={`/studies/${study.id}/assessments`}>
              View Assessments
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default StudyContent;
