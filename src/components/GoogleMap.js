function GoogleMap({ location, link }) {
  return (
    <>
      <iframe
        title={location}
        src={link}
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
export default GoogleMap;
