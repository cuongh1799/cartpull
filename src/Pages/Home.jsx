import Header from "../Components/Header";
import backgroundVideo from "../Assets/cart.mp4"; // Replace with your actual path

export default function Home() {
  return (
     <>
      <div style={{ position: "relative", height: "calc(100vh - 7vh)", overflow: "hidden" }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            transform: "translate(-50%, -50%) scale(2.2)", // zooms in slightly
            zIndex: -1,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay content */}
        <div
          className="d-flex justify-content-center align-items-center text-white text-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <h1 className="mb-3">Cartethyia pulls</h1>
            <h4 className="mb-3">deluxe maximum schizophrenia 50/50 winner</h4>
            <a className="btn btn-outline-light btn-lg" href="/pulls" role="button">
              xdd we windows
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
