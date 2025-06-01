export default function MainCard() {
  return (
    // <div className="container mt-4">
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://static.wikia.nocookie.net/wutheringwaves/images/d/d5/Cartethyia_Card.png/revision/latest?cb=20250509103319"
          className="card-img-overlay"
          alt="Card Image"
        />
        <div className="card-body">
          <h5 className="card-title">Card Title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}
