import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div>
      <nav
        className="navbar  navbar-dark
       navbar-expand-sm "
      >
        <div className="container-fluid">
          <a
            className="navbar-toggler"
            type="a"
            data-bs-target="#mediumscreen"
            data-bs-toggle="collapse"
            aria-contols="mediumscreen"
            aria-expanded="false"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </a>

          <a href="#" className="navbar-brand">
            <span>JWT</span>
          </a>
          <div className="collapse navbar-collapse " id="mediumscreen">
            <ul className="navbar-nav ms-auto">
              <li>
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li>
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li>
                <a className="nav-link" href="/register">
                  Sign up
                </a>
              </li>
              <li>
                <a className="nav-link" href="/register">
                  Logout
                </a>
              </li>
              <li>
                <a className="nav-link" href="/register">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
