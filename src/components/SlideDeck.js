import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/dracula.css";

const RevealPresentation = ({ children }) => {
  const deck = useRef(null); // Ref to store the Reveal.js instance

  useEffect(() => {
    deck.current = new Reveal({
      backgroundTransition: "slide",
      controls: true,
      embedded: true,

      // Add other Reveal.js configuration options here
    });
    deck.current.initialize({});

    // Optional: Clean up Reveal.js instance on component unmount
    return () => {
      if (deck.current) {
        deck.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="reveal">
      <div className="slides">{children}</div>
    </div>
  );
};

export default RevealPresentation;
