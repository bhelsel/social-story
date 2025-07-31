import classes from "./AssessmentModal.module.css";

function AssessmentModal({
  expandedStudy,
  handleModalOverlayClick,
  closeModal,
  getDifficultyClass,
  variant = "default", // "default" or "reveal"
}) {
  const overlayClass =
    variant === "reveal"
      ? `${classes.modalOverlay} ${classes.modalOverlayReveal}`
      : classes.modalOverlay;

  const contentClass =
    variant === "reveal"
      ? `${classes.modalContent} ${classes.modalContentReveal}`
      : classes.modalContent;

  return (
    <div className={overlayClass} onClick={handleModalOverlayClick}>
      <div className={contentClass}>
        <div className={classes.modalHeader}>
          <h2 className={classes.modalTitle}>
            <span>{expandedStudy.icon}</span>
            {expandedStudy.title}
          </h2>
          <button className={classes.modalCloseButton} onClick={closeModal}>
            ×
          </button>
        </div>

        <div className={classes.modalBody}>
          <p className={classes.modalDescription}>
            {expandedStudy.description}
          </p>

          <div className={classes.modalMeta}>
            <div className={classes.modalMetaItem}>
              <div className={classes.durationDot}></div>
              <span className={classes.durationText}>
                {expandedStudy.duration}
              </span>
            </div>
            <div className={classes.modalMetaItem}>
              <div
                className={[
                  classes.difficultyBadge,
                  classes[getDifficultyClass(expandedStudy.difficulty)],
                ].join(" ")}
              >
                {expandedStudy.difficulty}
              </div>
            </div>
          </div>

          <div className={classes.cardTags}>
            {expandedStudy.tags.map((tag, index) => (
              <span key={index} className={classes.tag}>
                {tag}
              </span>
            ))}
          </div>

          <h3 className={classes.modalProceduresTitle}>
            Detailed Procedure Steps
          </h3>

          {expandedStudy.procedures.map((procedure, index) => (
            <div key={index} className={classes.modalProcedureItem}>
              <div className={classes.modalProcedureHeader}>
                <span className={classes.modalProcedureIcon}>
                  {procedure.icon}
                </span>
                <div className={classes.modalProcedureInfo}>
                  <h4>{procedure.title}</h4>
                  <span>{procedure.duration}</span>
                </div>
              </div>
              <p className={classes.modalProcedureDescription}>
                {procedure.description}
              </p>
              {procedure.details && (
                <ul className={classes.modalProcedureDetails}>
                  {procedure.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssessmentModal;
