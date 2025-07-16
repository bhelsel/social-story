import { useParams } from "react-router-dom";
import studies from "../data/studies.json";
import StudyContent from "../components/StudyContent";

const StudyDetailPage = () => {
  const { studyId } = useParams();

  // Find the study with the matching id
  const study = studies.find((s) => s.id === studyId);

  if (!study) {
    return <div>Study not found</div>;
  }

  return <StudyContent study={study} />;
};

export default StudyDetailPage;
