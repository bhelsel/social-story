import Slide from "../components/Slide";

function GradientSlide({ title, text }) {
  return (
    <Slide
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      textColor="white"
    >
      <h2>{title}</h2>
      <p>{text}</p>
    </Slide>
  );
}

export default GradientSlide;
