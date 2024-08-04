import { Routes as Router, Route } from "react-router-dom";

import { RouteElement } from "./route";

import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signUp";
import { Main } from "../pages/Main";

export function Routes() {
  return (
    <Router>
      <Route path="/" element={<RouteElement element={SignIn} />} />
      <Route path="/signup" element={<RouteElement element={SignUp} />} />
      <Route path="/main" element={<RouteElement element={Main} isPrivate />} />
    </Router>
  );
}
