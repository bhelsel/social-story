import PageContent from "../components/PageContent";
import YouTubeEmbed from "../components/YouTubeEmbed";

function HomePage() {
  return (
    <>
      <PageContent title="YOU ARE A RESEARCH HERO!">
        <p>Thank you for your participation in our research studies!</p>
        <p>
          This app will guide you through your research experience at University
          of Kansas Medical Center
        </p>
      </PageContent>
      <YouTubeEmbed videoId={"UMoSnfFzAHw?si=kr4JUAnOkXkGGo35"} />
    </>
  );
}

export default HomePage;
