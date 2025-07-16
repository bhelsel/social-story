import { useParams, Link, Outlet } from "react-router-dom";
import studies from "../data/studies.json";

const StudyDetailPage = () => {
  const { studyId } = useParams();

  // Find the study with the matching id
  const study = studies.find((s) => s.id === studyId);

  if (!study) {
    return <div>Study not found</div>;
  }

  return (
    <div>
      <h1>{study.title}</h1>
      <p>{study.description}</p>
      {/* <img src={study.image} alt={study.id} /> */}

      <div>
        <h2>Study Details</h2>
        <p>
          <strong>ID:</strong> {study.id}
        </p>
        <p>
          <strong>Duration:</strong> {study.duration}
        </p>
        <p>
          <strong>Status:</strong> {study.status}
        </p>
        {/* Display any other properties from your JSON */}
      </div>

      <nav>
        <h3>Related Pages:</h3>
        <ul>
          <li>
            <Link to={`/studies/${studyId}/presentations`}>
              View Presentations
            </Link>
          </li>
          <li>
            <Link to={`/studies/${studyId}/assessments`}>View Assessments</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default StudyDetailPage;
