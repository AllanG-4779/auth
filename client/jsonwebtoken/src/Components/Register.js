// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./register.scoped.css";

function Register() {
  const [user, setUser] = useState({});
  const [load, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const pass = document.getElementById("message");

  const saveData = async (e) => {
    setloading(!load);

    e.preventDefault();

    // try {
    //
    //   const request = await axios.post("http://localhost:3002/register", user);
    // } catch (error) {
    //   setloading(!load);
    //   if (error.response) {
    //   }
    // }

    axios
      .post("http://localhost:3002/register", user)
      .then((succ) => {
        setloading(load);
        if (succ.data) {
          setMessage(succ.data.Message);
          document.querySelector("#message").className = `alert alert-success`;
        }
        setTimeout(() => {
          document.querySelector("#message").className = ``;
          setMessage("");
          window.location = "/login";
        }, 2000);
      })
      .catch((e) => {
        setloading(load);
        if (e.response) {
          setMessage(e.response.data.Message);
          document.querySelector("#message").className = `alert alert-danger`;
          setTimeout(() => {
            document.querySelector("#message").className = ``;
            setMessage("");
          }, 5000);
        }
      });
  };

  return (
    <div className="container">
      {!load ? (
        <div className="row">
          <div
            className={`m-auto shadow p-4  mt-3 border-none col-sm-12, col-md-6, col-lg-6 `}
          >
            <p id="message" className="">
              {message}
            </p>
            <form onSubmit={(e) => saveData(e)} method="post">
              <h3 className="text-center">Register Here</h3>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  required
                  autoFocus
                  placeholder="e.g Allan"
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  required
                  placeholder="e.g Odhiambo"
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  placeholder="valid address"
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  required
                  placeholder="254..."
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  required
                  placeholder="dd/mm/yyyy"
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
                <label htmlFor={"confirm"}>Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  className="form-control"
                  required
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary align-center">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <img
          style={{ width: "50px", marginLeft: "40%", marginTop: "20%" }}
          src="Spinner.svg"
        />
      )}
    </div>
  );
}

export default Register;
