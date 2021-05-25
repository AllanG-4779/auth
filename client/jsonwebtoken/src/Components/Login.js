// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactComponent as Spinner } from "../images/Spinner.svg";

function Login() {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const errors = document.querySelector("#errors");

  const login = (e) => {
    e.preventDefault();
    setLoad(true);
    //make a call to the api
  

    axios
      .post(`http://localhost:3002/login/${user.email_phone}/${user.password}`)
      .then((success) => {
        setLoad(false);
        if (success.data) {
          console.log(success.data);
        }
      })
      .catch((error) => {
        setLoad(false);

        if (error.response) {
          errors.className = "alert alert-danger";
          console.log(error)
          setErr(error.response.data.Message);
        }
        setTimeout(() => {
          errors.className = "";
          setErr("");
        }, 5000);
      });
  };
  useEffect(() => {
    // axios
    //   .get("http://localhost:3002/check/")
    //   .then((succ) => {
    //     console.log(succ);
    //   })
    //   .catch((e) => {console.log(e)});
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className=" m-auto p-4 shadow mt-3 border-none col-sm-12 col-md-6 col-lg-5 col-xlg-4">
          <form method="post">
            <h3 className="text-center">Login Here</h3>
            <div className="form-group">
              <label htmlFor="email">Email or Phone</label>
              <input
                type="text"
                name="email_phone"
                className="form-control"
                required
                autoFocus
                placeholder="joh.doe@something"
                onChange={(e) => {
                  setUser({ ...user, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => {
                  setUser({ ...user, [e.target.name]: e.target.value });
                }}
                required
              />
            </div>
            <div className="form-group">
              <p>
                <a className="link-success" href="#">
                  Forgot password ?
                </a>
              </p>
              <p id="errors">{err}</p>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary  float-center"
                onClick={(e) => login(e)}
              >
                {load ? (
                  <Spinner
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "white",
                      backgroundColor: "rgb(11,94,216)",
                      borderRadus: "4px",
                    }}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
