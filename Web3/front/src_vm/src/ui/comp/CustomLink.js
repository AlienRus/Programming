function CustomLink({ onClick, img }) {
  return (
    <a onClick={onClick}>
      <img src={img} alt="More"></img>
    </a>
  );
}

export default CustomLink;
