import classes from "./StudyContent.module.css";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function StudyContent({ study }) {
  const [showButtons, setShowButtons] = useState(true);

  function handleLinkClick() {
    setShowButtons(!showButtons);
  }

  return (
    <div className={classes.content}>
      <header className={classes.header}>
        <h1 className={classes.studyId}>{study.id}</h1>
        <h2 className={classes.studyTitle}>{study.title}</h2>
        {showButtons && (
          <div>
            <Link
              className={classes.askQuestionBtn}
              to={`/studies/${study.id}/chat`}
              onClick={handleLinkClick}
            >
              Ask a Question
            </Link>

            <div className={classes.studyDescription}>
              <p>{study.description}</p>
            </div>
          </div>
        )}
        {!showButtons && (
          <div className={classes.cardBottom}>
            <div className={classes.flipIndicator}>
              <span>Return</span>
              <Link
                className={classes.flipArrow}
                to={`/studies/${study.id}`}
                onClick={handleLinkClick}
              ></Link>
            </div>
          </div>
        )}
      </header>

      {showButtons && (
        <nav className={classes.navigation}>
          <ul className={classes.studyContent}>
            <li>
              <Link
                to={`/studies/${study.id}/presentations`}
                onClick={handleLinkClick}
              >
                View Social Story
              </Link>
            </li>
            <li>
              <Link
                to={`/studies/${study.id}/assessments`}
                onClick={handleLinkClick}
              >
                View Assessments
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <div className={classes.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default StudyContent;
