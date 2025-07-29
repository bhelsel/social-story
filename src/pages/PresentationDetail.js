import { useParams } from "react-router-dom";

import SlideDeck from "../components/SlideDeck";
import PanoptoPlayer from "../components/PanoptoEmbed.js";
import SocialStoryRenderer from "../components/SocialStoryRender.js";
import studies from "../data/studies.json";

function PresentationDetailPage() {
  const { studyId } = useParams();

  // Find the study with the matching id
  const study = studies.find((s) => s.id === studyId);

  return (
    <>
      {study["social-story"].Panopto ? (
        <PanoptoPlayer videoId={study["social-story"].Panopto.videoId} />
      ) : (
        <SlideDeck>
          <SocialStoryRenderer data={study} />
        </SlideDeck>
      )}
    </>
  );
}

export default PresentationDetailPage;
