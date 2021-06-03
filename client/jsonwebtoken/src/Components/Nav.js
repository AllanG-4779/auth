// @ts-nocheck
import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { logged } from "./Contexts";
import "./Nav.css";

function Nav() {
  const [log] = useContext(logged);

  const logOut = () => {
    localStorage.removeItem("logged");
    window.location = "/login";
  };
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
{/* this is to print user name */}
          <a href="#" className="navbar-brand">
            <span>JWT</span>
          </a>
          <div className="collapse navbar-collapse " id="mediumscreen">
            <ul className="navbar-nav ms-auto">
              {log && (
                <li>
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              {!log && (
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {!log && (
                <li>
                  <Link className="nav-link" to="/register">
                    Sign up
                  </Link>
                </li>
              )}

              {log && (
                <li>
                  <a className="nav-link" to="/register">
                    Profile
                  </a>
                </li>
              )}
              <li>
                {" "}
                {log && (
                  <button
                    className=" nav-link btn-sm btn btn-primary btn-block"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
