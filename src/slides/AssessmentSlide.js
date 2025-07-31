import { useEffect, useState } from "react";
import Slide from "../components/Slide";
import assessments from "../data/assessments.json";
import AssessmentModal from "../components/AssessmentModal";
import classes from "./AssessmentSlide.module.css";

function AssessmentSlides({ studyAssessments }) {
  const [customStudyAssessments, setCustomStudyAssessments] = useState([]);

  const [expandedStudy, setExpandedStudy] = useState(null);

  useEffect(() => {
    setCustomStudyAssessments(
      assessments.filter((x) => studyAssessments.includes(x.id))
    );
  }, [studyAssessments]);

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
      <Slide>
        <h2>Assessments</h2>
      </Slide>
      {customStudyAssessments.map((test) => (
        <Slide>
          <div className={classes.cardContainer}>
            <div className={classes.cardHeader}>
              <div className={classes.cardIcon}>{test.icon}</div>
              <h2>{test.title}</h2>
              <p>{test.duration}</p>
              <h3>{test.description}</h3>
            </div>
            <div className={classes.contentContainer}>
              {test.image ? (
                <div className={classes.imageContainer}>
                  <img src={test.image} alt={test.title} />
                </div>
              ) : null}
              <div className={classes.proceduresContainer}>
                <ul className={classes.procedureList}>
                  {test.procedures.map((procedure, index) => (
                    <li key={index}>
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
              onClick={(e) => handleExpandClick(e, test)}
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
        </Slide>
      ))}
    </>
  );
}

export default AssessmentSlides;
