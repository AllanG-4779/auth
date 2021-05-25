import "./App.css";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Dashboard from "./Components/Dashboard";
import SortingVisual from "./visual/SortingVisual";

function App() {
  return (
    <div className="App">
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
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      {/* <SortingVisual/> */}
    </div>
  );
}

export default App;
