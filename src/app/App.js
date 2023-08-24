import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
// import NotFound from "./layouts/not-found";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login:type?" component={Login} />
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
