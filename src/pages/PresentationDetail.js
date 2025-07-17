// import Reveal from "reveal.js";
import Slide from "../components/Slide";
// import Deck from "../components/SlideDeck";
import SlideDeck from "../components/SlideDeck";
import TitleSlide from "../slides/TitleSlide";

function PresentationDetailPage() {
  return (
    <>
      <SlideDeck>
        <TitleSlide />
        <Slide
          background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          textColor="white"
          className="special-slide"
        >
          <h1>Start Social Story Here</h1>
        </Slide>
      </SlideDeck>
    </>
  );
}

export default PresentationDetailPage;
