import React, { useState } from "react";
import backgroundVideo from "../Assets/cart.mp4"; // Replace with your actual path

export default function Gacha() {
  const [result, setResult] = useState(null);

  // Handle the roll logic
  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 101); // 0-100 inclusive
    if (roll === 0) {
      setResult({ roll, message: "🎉 SUPER WIN! You rolled 0! 🎉" });
    } else if (roll % 13 === 0) {
      setResult({ roll, message: `✨ You WIN! ${roll} is divisible by 13! ✨` });
    } else {
      setResult({ roll, message: `😢 You lose! You rolled ${roll}. Try again!` });
    }
  };

  // Reset the result to roll again
  const handleReset = () => setResult(null);

  return (
    <>
      <div style={{ position: "relative", height: "calc(100vh - 7vh)", overflow: "hidden" }}>
        {/* Overlay content */}
        <div
          className="d-flex justify-content-center align-items-center text-white text-center"
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <h1 className="mb-3">xdd Gacha</h1>
            <h4 className="mb-3">
              0-100, if divisible by 13 you shall get free welkin any game
            </h4>
            {!result ? (
              <button
                className="btn btn-outline-light btn-lg"
                onClick={handleRoll}
              >
                Roll!
              </button>
            ) : (
              <div>
                <h2>{result.message}</h2>
                <button
                  className="btn btn-outline-light btn-lg mt-3"
                  onClick={handleReset}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
