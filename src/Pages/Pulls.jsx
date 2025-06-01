import React, { useEffect, useRef, useState } from "react";
import gif1 from "../Assets/wide-cat-widetime.gif";
import gif2 from "../Assets/widetime-cat.gif";
import gif3 from "../Assets/widetime.gif";
import gif4 from "../Assets/xddtime.gif";
import gif5 from "../Assets/xddtime.gif";

// List of GIFs to display
const gifs = [gif1, gif2, gif3, gif4, gif5];

export default function Pulls() {
  // Position and velocity state for each GIF
  const [objects, setObjects] = useState([]);

  // Drag state
  const [dragged, setDragged] = useState(null); // Index of the currently dragged GIF
  const dragOffset = useRef({ x: 0, y: 0 });    // Offset between mouse and GIF top-left
  const lastMouse = useRef({ x: 0, y: 0 });     // For calculating throw velocity

  // Initialize GIF positions and movement on mount
  useEffect(() => {
    const initial = gifs.map(() => ({
      x: Math.random() * window.innerWidth * 0.8,
      y: Math.random() * window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
    }));
    setObjects(initial);
  }, []);

  // Animation loop: gravity, bouncing, friction
  useEffect(() => {
    let animationId;
    const gravity = 0.4;
    const bounce = 0.8;

    const update = () => {
      setObjects(prev =>
        prev.map(obj => {
          let { x, y, vx, vy } = obj;

          // Gravity
          vy += gravity;

          // Apply velocity to position
          x += vx;
          y += vy;

          const size = 100;
          const w = window.innerWidth;
          const h = window.innerHeight;

          // Wall collisions
          if (x <= 0 || x + size >= w) {
            x = Math.max(0, Math.min(w - size, x));
            vx = -vx * bounce;
          }

          // Floor and ceiling
          if (y + size >= h) {
            y = h - size;
            if (vy > 1) {
              vy = -vy * bounce;
              vx += (Math.random() - 0.5) * 2; // Add randomness on bounce
            } else {
              vy = 0;
              vx *= 0.5; // Friction on floor
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

  // When mouse is pressed on a GIF
  const onMouseDown = (e, index) => {
    e.preventDefault();
    setDragged(index);
    dragOffset.current = {
      x: e.clientX - objects[index].x,
      y: e.clientY - objects[index].y,
    };
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  // While dragging, move the GIF with the mouse
  const onMouseMove = e => {
    if (dragged === null) return;
    setObjects(prev =>
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

  // On mouse release, calculate throw velocity
  const onMouseUp = e => {
    if (dragged === null) return;
    setObjects(prev =>
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

  // Attach drag listeners only when dragging
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
    <>
      <style>{`
        body {
          margin: 0;
          overflow: hidden;
          background: black;
        }
      `}</style>
      <div style={styles.container}>
        {objects.map((obj, index) => (
          <img
            key={index}
            src={gifs[index]}
            alt={`Gif ${index}`}
            style={{
              ...styles.gif,
              transform: `translate(${obj.x}px, ${obj.y}px)`,
              zIndex: dragged === index ? 10 : 1,
              opacity: dragged === index ? 0.8 : 1,
            }}
            onMouseDown={e => onMouseDown(e, index)}
          />
        ))}
      </div>
    </>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  gif: {
    position: "absolute",
    width: "100px",
    height: "100px",
    cursor: "grab",
    userSelect: "none",
  },
};
