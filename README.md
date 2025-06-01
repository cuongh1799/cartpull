# Cat Bounce but xdd


## 🧹 What It Does

- Renders a set of GIFs
- Applies gravity to make them fall
- Makes them bounce off the screen edges
- Allows you to click and drag a GIF
- When released, GIFs fly based on throw velocity

---

## 💡 Key Concepts (Beginner-Friendly)

### 1. State for Each GIF

We use `useState()` to store each GIF’s position (`x`, `y`) and movement (`vx`, `vy`):

```js
const [objects, setObjects] = useState([]);
```

Each object represents a floating GIF.

### 2. Gravity & Physics

Using `requestAnimationFrame`, we simulate simple physics:

```js
vy += gravity;     // Falling down
x += vx;
y += vy;
```

We check for collisions with screen edges and bounce back by reversing velocity:

```js
vx = -vx * bounce;
vy = -vy * bounce;
```

### 3. Drag & Throw

- Mouse down selects a GIF and remembers where you clicked
- Mouse move follows your cursor
- Mouse up applies velocity based on how fast you dragged

```js
vx: (e.clientX - lastMouse.current.x) * 0.3
```

This creates a satisfying fling motion.

### 4. Rendering

Each GIF is rendered with `transform: translate(x, y)` to move it around the screen:

```js
<img
  src={gifs[index]}
  style={{
    transform: `translate(${obj.x}px, ${obj.y}px)`
  }}
/>
```

### 5. Styling

- The background is black for contrast
- GIFs are positioned absolutely so they can float freely
- Overflow is hidden to prevent scrollbars

```css
body {
  margin: 0;
  overflow: hidden;
  background: black;
}
```

---

## 👷‍♂️ Technologies

- React (Functional Components)
- Hooks: `useState`, `useEffect`, `useRef`
- **CSS-in-JS`

---

## 🚀 Try It Out

Add your own GIFs to `/Assets`, import them, and launch your app. You'll see the GIFs bounce, fly, and float in a physics-based playground.
