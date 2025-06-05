import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <header style={{ height: "7vh", display: "flex", alignItems: "center" }}>
      <nav className="navbar navbar-expand-lg bg-dark w-100" style={{ height: "100%" }}>
        <div className="container justify-content-center">
          <div className="collapse navbar-collapse show" id="navbarExample01">
            <ul className="navbar-nav d-flex flex-row justify-content-center w-100 mb-0">
              <li className="nav-item mx-4">
                <a className="nav-link text-white" href="/">Home</a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link text-white" href="/pulls">Pulls</a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link text-white" href="/gacha">Gacha</a>
              </li>
              {/* <li className="nav-item mx-4">
                <a className="nav-link text-white" href="/about">About</a>
              </li> */}
              <li className="nav-item mx-4">
                <a className="nav-link text-white" href="https://github.com/cuongh1799/cartpull">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
