function Slide({ children, transition = "slide", className, ...props }) {
  return (
    <section data-transition={transition} className={className} {...props}>
      {children}
    </section>
  );
}

export default Slide;
