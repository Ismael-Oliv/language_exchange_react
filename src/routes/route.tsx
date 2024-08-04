import React from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/Auth";

interface RouteInterface {
  isPrivate?: boolean;
  element: React.ComponentType;
}

export function RouteElement({ isPrivate = false, element: Element }: RouteInterface) {
  const { user } = useAuth();

  return isPrivate === !!user ? <Element /> : <Navigate to={{ pathname: isPrivate ? "/" : "/main" }} />;
}
