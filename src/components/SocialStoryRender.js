import TitleSlide from "../slides/TitleSlide";
import PurposeSlide from "../slides/PurposeSlide";
import TeamSlide from "../slides/TeamSlide";
import InclusionCriteriaSlide from "../slides/InclusionCriteriaSlide";
import StudyLocationSlide from "../slides/StudyLocationSlide";
import AssessmentSlides from "../slides/AssessmentSlide";

function SocialStoryRenderer({ data }) {
  const TitleSlideData = data["social-story"].TitleSlide;
  const PurposeSlideData = data["social-story"].PurposeSlide;
  const TeamSlideData = data["social-story"].TeamSlide;
  const InclusionCriteriaSlideData =
    data["social-story"].InclusionCriteriaSlide;
  const StudyLocationSlideData = data["social-story"].StudyLocationSlide;
  const assessments = data.assessments;

  return (
    <>
      {TitleSlideData ? (
        <TitleSlide
          title={TitleSlideData.title}
          text={TitleSlideData.text}
          image={data.image}
        />
      ) : null}
      {PurposeSlideData ? (
        <PurposeSlide
          title={PurposeSlideData.title}
          text={PurposeSlideData.text}
        />
      ) : null}
      {TeamSlideData ? (
        <TeamSlide
          title={TeamSlideData.title}
          text={TeamSlideData.text}
          team={TeamSlideData.team}
        />
      ) : null}
      {InclusionCriteriaSlideData ? (
        <InclusionCriteriaSlide
          title={InclusionCriteriaSlideData.title}
          criteria={InclusionCriteriaSlideData.criteria}
        />
      ) : null}
      {StudyLocationSlideData ? (
        <StudyLocationSlide
          title={StudyLocationSlideData.title}
          location={StudyLocationSlideData.location}
        />
      ) : null}
      <AssessmentSlides study={data} studyAssessments={assessments} />
    </>
  );
}

export default SocialStoryRenderer;
