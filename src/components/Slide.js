function Slide({
  children,
  transition = "slide",
  style = {},
  background = "",
  textColor = "",
  padding = "",
}) {
  const slideStyle = {
    ...style,
    ...(background && { background }),
    ...(textColor && { color: textColor }),
    ...(padding && { padding }),
  };

  return (
    <section data-transition={transition} style={slideStyle}>
      {children}
    </section>
  );
}

export default Slide;
