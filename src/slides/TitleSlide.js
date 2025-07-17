import { useParams } from "react-router-dom";

import Slide from "../components/Slide";
import studies from "../data/studies.json";

function TitleSlide() {
  const { studyId } = useParams();

  // Find the study with the matching id
  const study = studies.find((s) => s.id === studyId);
  return (
    <Slide
      style={{ backgroundColor: "#f3f4f6", fontSize: "1.2rem" }}
      textColor="#1f2937"
      padding="3rem"
    >
      <h1>{study.id}</h1>
      <img src={study.image} alt={study.id}></img>
    </Slide>
  );
}

export default TitleSlide;
