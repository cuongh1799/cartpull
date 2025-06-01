import React, { useEffect, useRef, useState } from "react";
import gif1 from "../Assets/wide-cat-widetime.gif";
import gif2 from "../Assets/widetime-cat.gif";
import gif3 from "../Assets/widetime.gif";
import gif4 from "../Assets/xddtime.gif";
import gif5 from "../Assets/xddtime.gif";
import '../Styles/index.css';

// List of GIFs to display
const gifs = [gif1, gif2, gif3, gif4, gif5];

export default function Pulls() {
  // State: holds position (x, y) and velocity (vx, vy) for each GIF
  const [objects, setObjects] = useState([]);

  // State for dragging logic
  const [dragged, setDragged] = useState(null); // Index of the GIF being dragged, or null if none
  const dragOffset = useRef({ x: 0, y: 0 });    // Mouse offset from GIF's top-left when drag starts
  const lastMouse = useRef({ x: 0, y: 0 });     // Last mouse position (for throw velocity)

  // On mount: initialize GIFs with random positions and velocities
  useEffect(() => {
    const initial = gifs.map(() => ({
      x: Math.random() * window.innerWidth * 0.8,   // Random X position
      y: Math.random() * window.innerHeight * 0.4,  // Random Y position
      vx: (Math.random() - 0.5) * 6,                // Random X velocity
      vy: (Math.random() - 0.5) * 6,                // Random Y velocity
    }));
    setObjects(initial);
  }, []);

  // Animation loop: applies gravity, bouncing, and friction to each GIF
  useEffect(() => {
    let animationId;
    const gravity = 0.4; // Downward force
    const bounce = 0.8;  // Energy retained after bounce

    const update = () => {
      setObjects(prev =>
        prev.map(obj => {
          let { x, y, vx, vy } = obj;

          // Apply gravity to vertical velocity
          vy += gravity;

          // Move GIF by its velocity
          x += vx;
          y += vy;

          const size = 320; // GIF size in px (should match .gif-img in CSS)
          const w = window.innerWidth;
          const h = window.innerHeight;

          // Bounce off left/right walls
          if (x <= 0 || x + size >= w) {
            x = Math.max(0, Math.min(w - size, x));
            vx = -vx * bounce;
          }

          // Bounce off floor
          if (y + size >= h) {
            y = h - size;
            if (vy > 1) {
              vy = -vy * bounce; // Bounce up
              vx += (Math.random() - 0.5) * 2; // Add a little randomness
            } else {
              vy = 0;            // Stop vertical movement
              vx *= 0.5;         // Apply friction to slow down horizontally
              if (Math.abs(vx) < 0.1) vx = 0; // Stop if very slow
            }
          } else if (y <= 0) {
            // Bounce off ceiling
            y = 0;
            vy = -vy * bounce;
          }

          return { x, y, vx, vy };
        })
      );
      animationId = requestAnimationFrame(update); // Keep animating
    };

    update(); // Start animation
    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
  }, []);

  // When mouse is pressed on a GIF: start dragging
  const onMouseDown = (e, index) => {
    e.preventDefault();
    setDragged(index); // Set which GIF is being dragged
    dragOffset.current = {
      x: e.clientX - objects[index].x, // Store offset from GIF's top-left
      y: e.clientY - objects[index].y,
    };
    lastMouse.current = { x: e.clientX, y: e.clientY }; // Store mouse position
  };

  // While dragging: move the GIF with the mouse
  const onMouseMove = e => {
    if (dragged === null) return;
    setObjects(prev =>
      prev.map((obj, i) =>
        i === dragged
          ? {
              ...obj,
              x: e.clientX - dragOffset.current.x, // Follow mouse, keeping offset
              y: e.clientY - dragOffset.current.y,
              vx: 0, // Stop velocity while dragging
              vy: 0,
            }
          : obj
      )
    );
  };

  // On mouse release: "throw" the GIF by setting its velocity
  const onMouseUp = e => {
    if (dragged === null) return;
    setObjects(prev =>
      prev.map((obj, i) =>
        i === dragged
          ? {
              ...obj,
              vx: (e.clientX - lastMouse.current.x) * 0.3, // Throw velocity based on mouse movement
              vy: (e.clientY - lastMouse.current.y) * 0.3,
            }
          : obj
      )
    );
    setDragged(null); // Stop dragging
  };

  // Attach mousemove and mouseup listeners only while dragging
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

  // Render GIFs at their positions, with drag/throw interaction
  return (
    <div className="gif-container">
      {objects.map((obj, index) => (
        <img
          key={index}
          src={gifs[index]}
          alt={`Gif ${index}`}
          className="gif-img"
          style={{
            transform: `translate(${obj.x}px, ${obj.y}px)`, // Move GIF to (x, y)
            zIndex: dragged === index ? 10 : 1,             // Bring dragged GIF to front
            opacity: dragged === index ? 0.8 : 1,           // Slightly transparent while dragging
          }}
          onMouseDown={e => onMouseDown(e, index)}          // Start drag on mouse down
        />
      ))}
    </div>
  );
}
