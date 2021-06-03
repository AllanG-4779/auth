import "./App.css";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Dashboard from "./Components/Dashboard";

import { logged, notLogRedirect } from "./Components/Contexts";
import { useEffect, useState } from "react";
import Home from "./Components/Home";

function App() {
  const [log, setLog] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      setLog(true);
    }
    console.log(log);
  }, [log]);
  return (
    <div className="App">
      <notLogRedirect.Provider value={[redirect, setRedirect]}>
        <logged.Provider value={[log, setLog]}>
          <Router>
            <Nav />
            <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </Router>
        </logged.Provider>
      </notLogRedirect.Provider>
      {/* <SortingVisual/> */}
    </div>
  );
}

export default App;
