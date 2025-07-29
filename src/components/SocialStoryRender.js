import TitleSlide from "../slides/TitleSlide";
import GradientSlide from "../slides/GradientSlide";
import TeamSlide from "../slides/TeamSlide";

// import PanoptoPlayer from "../components/PanoptoEmbed.js";

function SocialStoryRenderer({ data }) {
  const TitleSlideData = data["social-story"].TitleSlide;
  const AboutSlideData = data["social-story"].AboutSlide;
  const TeamSlideData = data["social-story"].TeamSlide;
  return (
    <>
      {TitleSlideData ? (
        <TitleSlide
          title={TitleSlideData.title}
          text={TitleSlideData.text}
          image={data.image}
        />
      ) : null}
      {AboutSlideData ? (
        <GradientSlide
          title={AboutSlideData.title}
          text={AboutSlideData.text}
        />
      ) : null}
      {TeamSlideData ? (
        <TeamSlide
          title={TeamSlideData.title}
          text={TeamSlideData.text}
          team={TeamSlideData.team}
        />
      ) : null}
    </>
  );
}

export default SocialStoryRenderer;
