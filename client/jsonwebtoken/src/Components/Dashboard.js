// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { notLogRedirect, logged } from "./Contexts";

function Dashboard() {
  const [log, setLog] = useContext(logged);
  const [current, setCurr] = useState({});
  useEffect(() => {
    let token = "";
    if (localStorage.getItem("logged")) {
      token = JSON.parse(localStorage.getItem("logged")).token;
    }
    axios
      .get("http://localhost:3002/dashboard", {
        headers: {
          Authorization: `Bearer ${token}
            
          `,
        },
      })
      .then((ok) => {
        if (ok.data.Message) {
          console.log(ok.data);
          setCurr(ok.data.Message);
        }
        console.log(current.id);
      })
      .catch((e) => {
        window.location = "/login";
      });
  }, []);
  return (
    log && (
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-12 col-md-6 ">
            <div className="card">
              <div className="card-header">
                <h3 className="text-warning ">
                  Currently Logged in user info
                </h3>
              </div>
              <div className="card-body">
                {typeof current.user !== "undefined" ? (
                  <div>
                    <p>
                      Name{" "}
                      <span className="text-success ">
                        {current.user.first_name}
                      </span>
                    </p>
                    <p>
                      surname{" "}
                      <span className="text-success ">
                        {current.user.last_name}
                      </span>
                    </p>
                    <p>
                      Email{" "}
                      <span className="text-success ">
                        {current.user.email}
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="card-footer">
                <p>Copy Student and maintained</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Dashboard;
