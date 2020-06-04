import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreateLocal from "./pages/CreateLocal";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={CreateLocal} path="/create-local" />
    </BrowserRouter>
  );
};

export default Routes;
