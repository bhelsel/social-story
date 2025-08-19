import { useState } from "react";
import AssessmentModal from "../components/AssessmentModal";
import classes from "./AssessmentSlide.module.css";

function AssessmentSlides({ assessment }) {
  const [expandedStudy, setExpandedStudy] = useState(null);

  const closeModal = () => {
    setExpandedStudy(null);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "difficultyEasy";
      case "Moderate":
        return "difficultyModerate";
      case "Hard":
        return "difficultyHard";
      default:
        return "difficultyEasy";
    }
  };

  const handleExpandClick = (e, assessment) => {
    e.stopPropagation();
    setExpandedStudy(assessment);
  };

  return (
    <>
      <div className={classes.cardContainer}>
        <div className={classes.cardHeader}>
          <div className={classes.cardIcon}>{assessment.icon}</div>
          <h2>{assessment.title}</h2>
          <p>{assessment.duration}</p>
          <h3>{assessment.summary}</h3>
        </div>
        <div className={classes.contentContainer}>
          {assessment.image ? (
            <div className={classes.imageContainer}>
              <img src={assessment.image} alt={assessment.title} />
            </div>
          ) : null}
          <div className={classes.proceduresContainer}>
            <ul className={classes.procedureList}>
              {assessment.procedures.map((procedure) => (
                <li key={procedure.title}>
                  <div className={classes.procedureHeader}>
                    <div>{procedure.icon}</div>
                    <p>{procedure.title}</p>
                  </div>
                  <p>{procedure.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.cardBottom}>
        <button
          className={classes.expandButton}
          onClick={(e) => handleExpandClick(e, assessment)}
        >
          <span>View Details</span>
          <span>📋</span>
        </button>
      </div>
      {/* Modal for expanded view */}
      {expandedStudy && (
        <AssessmentModal
          expandedStudy={expandedStudy}
          handleModalOverlayClick={handleModalOverlayClick}
          closeModal={closeModal}
          getDifficultyClass={getDifficultyClass}
          variant="reveal"
        />
      )}
    </>
  );
}

export default AssessmentSlides;
