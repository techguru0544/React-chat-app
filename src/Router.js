import React, { useEffect, useState } from "react";
import LandingPage from "./screens/landingPage/LandingPage";

import SideBar from "./sharedComponents/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function AppRouter() {
  const [user, setUser] = useState(null);

  return (
    <div className="main-container">
      <SideBar selecteUser={(user) => setUser(user)} />
      <Router>
        <Switch>
          <Route path="/">
            <LandingPage user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
