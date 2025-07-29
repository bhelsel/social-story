import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slide from "../components/Slide";
import studies from "../data/studies.json";
import team from "../data/team.json";
import classes from "./TeamSlide.module.css";

function TeamSlide({ title, text }) {
  const [studyTeam, setStudyTeam] = useState([]);

  const { studyId } = useParams();

  const study = studies.find((s) => s.id === studyId);

  useEffect(() => {
    const sortedTeam = study.team
      .map((teamId) => team.find((member) => member.id === teamId))
      .filter((member) => member !== undefined); // Remove any missing members

    setStudyTeam(sortedTeam);
  }, [study.team]);

  return (
    <Slide>
      <div className={classes.ourTeam}>
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
        <ul>
          {studyTeam.map((member) => (
            <li key={member.id}>
              <p>{member.id}</p>
              <img src={member.image} alt={member.id} />
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}

export default TeamSlide;
