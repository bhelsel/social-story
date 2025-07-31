import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import studies from "../data/studies.json";
import assessments from "../data/assessments.json";
import classes from "./Assessments.module.css";
import YouTubeEmbed from "./YouTubeEmbed.js";
import AssessmentModal from "./AssessmentModal.js";

function AssessmentPage() {
  const [studyAssessments, setStudyAssessments] = useState([]);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [expandedStudy, setExpandedStudy] = useState(null);

  const { studyId } = useParams();

  const study = studies.find((s) => s.id === studyId);

  useEffect(() => {
    setStudyAssessments(
      assessments.filter((x) => study.assessments.includes(x.id))
    );
  }, [study.assessments]);

  const closeModal = () => {
    setExpandedStudy(null);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const toggleCardFlip = (cardId) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
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
    <div className={classes.assessmentPage}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Explore our Research Assessments</h1>
        <p className={classes.pageSubtitle}>
          Click any card to learn more about what to expect.
        </p>
      </div>
      <div className={classes.assessmentsGrid}>
        {studyAssessments.map((study) => {
          const isFlipped = flippedCards.has(study.id);

          return (
            <div key={study.id} className={classes.cardContainer}>
              <div
                className={`${classes.cardFlipper} ${
                  isFlipped ? classes.flipped : ""
                }`}
                onClick={() => toggleCardFlip(study.id)}
              >
                {/* Front of card */}
                <div
                  className={[classes.cardFace, classes.cardFront].join(" ")}
                >
                  <div className={classes.cardContent}>
                    <div className={classes.cardOverlay}></div>
                    <div className={classes.cardInner}>
                      <div className={classes.cardHeader}>
                        <div className={classes.cardIcon}>{study.icon}</div>
                        <div
                          className={[
                            classes.difficultyBadge,
                            classes[getDifficultyClass(study.difficulty)],
                          ].join(" ")}
                        >
                          {study.difficulty}
                        </div>
                      </div>

                      <h3 className={classes.cardTitle}>{study.title}</h3>
                      <p className={classes.cardDescription}>
                        {study.description}
                      </p>

                      <div className={classes.cardMeta}>
                        <div className={classes.durationInfo}>
                          <div className={classes.durationDot}></div>
                          <span className={classes.durationText}>
                            {study.duration}
                          </span>
                        </div>
                      </div>

                      <div className={classes.cardTags}>
                        {study.tags.map((tag, index) => (
                          <span key={index} className={classes.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={classes.cardBottom}>
                        <button
                          className={classes.expandButton}
                          onClick={(e) => handleExpandClick(e, study)}
                        >
                          <span>View Details</span>
                          <span>📋</span>
                        </button>

                        <div className={classes.flipIndicator}>
                          <span>Flip card</span>
                          <div className={classes.flipArrow}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className={[classes.cardFace, classes.cardBack].join(" ")}>
                  <div className={classes.cardContent}>
                    <div className={classes.cardOverlay}></div>
                    <div
                      className={[
                        classes.cardInner,
                        classes.cardBackContent,
                      ].join(" ")}
                    >
                      <div className={classes.backHeader}>
                        <h4>What to Expect</h4>
                        <button
                          className={classes.expandButton}
                          onClick={(e) => handleExpandClick(e, study)}
                        >
                          <span>View Details</span>
                          <span>📋</span>
                        </button>
                      </div>

                      {/* Add option to embed YouTube video */}
                      {study.video ? (
                        <YouTubeEmbed videoId={study.video} />
                      ) : (
                        <div className={classes.proceduresList}>
                          {study.procedures
                            .slice(0, 4)
                            .map((procedure, index) => (
                              <div
                                key={index}
                                className={classes.procedureItem}
                              >
                                <div className={classes.procedureHeader}>
                                  <span className={classes.procedureIcon}>
                                    {procedure.icon}
                                  </span>
                                  <div className={classes.procedureInfo}>
                                    <h5 className={classes.procedureTitle}>
                                      {procedure.title}
                                    </h5>
                                    <span className={classes.procedureDuration}>
                                      {procedure.duration}
                                    </span>
                                  </div>
                                </div>
                                <p className={classes.procedureDescription}>
                                  {procedure.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      )}

                      <div className={classes.backInstruction}>
                        <p className={classes.backInstructionText}>
                          Click to flip back
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for expanded view */}
      {expandedStudy && (
        <AssessmentModal
          expandedStudy={expandedStudy}
          handleModalOverlayClick={handleModalOverlayClick}
          closeModal={closeModal}
          getDifficultyClass={getDifficultyClass}
          variant="default"
        />
      )}
    </div>
  );
}

export default AssessmentPage;
