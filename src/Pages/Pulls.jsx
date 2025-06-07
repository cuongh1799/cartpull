import React, { useEffect, useRef, useState } from "react";
import gif1 from "../Assets/wide-cat-widetime.gif";
import gif2 from "../Assets/widetime-cat.gif";
import gif3 from "../Assets/widetime.gif";
import gif4 from "../Assets/xddtime.gif";
import gif5 from "../Assets/xddtime.gif";
import "../Styles/index.css";

const gifs = [gif1, gif2, gif3, gif4, gif5];

export default function Pulls() {
  const [objects, setObjects] = useState([]);
  const [dragged, setDragged] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const initial = gifs.map(() => ({
      x: Math.random() * window.innerWidth * 0.8,
      y: Math.random() * window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
    }));
    setObjects(initial);
  }, []);

  useEffect(() => {
    let animationId;
    const gravity = 0.4;
    const bounce = 0.8;

    const update = () => {
      setObjects((prev) =>
        prev.map((obj) => {
          let { x, y, vx, vy } = obj;

          vy += gravity;
          x += vx;
          y += vy;

          const size = 320;
          const w = window.innerWidth;
          const h = window.innerHeight;

          if (x <= 0 || x + size >= w) {
            x = Math.max(0, Math.min(w - size, x));
            vx = -vx * bounce;
          }

          if (y + size >= h) {
            y = h - size;
            if (vy > 1) {
              vy = -vy * bounce;
              vx += (Math.random() - 0.5) * 2;
            } else {
              vy = 0;
              vx *= 0.5;
              if (Math.abs(vx) < 0.1) vx = 0;
            }
          } else if (y <= 0) {
            y = 0;
            vy = -vy * bounce;
          }

          return { x, y, vx, vy };
        })
      );
      animationId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const onMouseDown = (e, index) => {
    e.preventDefault();
    setDragged(index);
    dragOffset.current = {
      x: e.clientX - objects[index].x,
      y: e.clientY - objects[index].y,
    };
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (dragged === null) return;
    setObjects((prev) =>
      prev.map((obj, i) =>
        i === dragged
          ? {
              ...obj,
              x: e.clientX - dragOffset.current.x,
              y: e.clientY - dragOffset.current.y,
              vx: 0,
              vy: 0,
            }
          : obj
      )
    );
  };

  const onMouseUp = (e) => {
    if (dragged === null) return;
    setObjects((prev) =>
      prev.map((obj, i) =>
        i === dragged
          ? {
              ...obj,
              vx: (e.clientX - lastMouse.current.x) * 0.3,
              vy: (e.clientY - lastMouse.current.y) * 0.3,
            }
          : obj
      )
    );
    setDragged(null);
  };

  useEffect(() => {
    if (dragged !== null) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragged]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background YouTube video */}
      <iframe
  src="https://www.youtube.com/embed/-Azt2Ccq3Yc?autoplay=1&mute=1&loop=1&playlist=-Azt2Ccq3Yc&controls=0&showinfo=0&modestbranding=1"
  frameBorder="0"
  allow="autoplay; fullscreen"
  allowFullScreen
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    pointerEvents: "none", // ✅ ensures it's non-interactive
  }}
/>


      {/* Interactive bouncing GIFs */}
      <div className="gif-container">
        {objects.map((obj, index) => (
          <img
            key={index}
            src={gifs[index]}
            alt={`Gif ${index}`}
            className="gif-img"
            style={{
              transform: `translate(${obj.x}px, ${obj.y}px)`,
              zIndex: dragged === index ? 10 : 1,
              opacity: dragged === index ? 0.8 : 1,
              position: "absolute",
              width: "320px",
              height: "auto",
              cursor: "grab",
            }}
            onMouseDown={(e) => onMouseDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}
