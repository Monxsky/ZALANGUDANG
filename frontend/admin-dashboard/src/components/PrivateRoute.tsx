// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = true; // Bisa diganti mock state login

interface Props { children: JSX.Element; }

const PrivateRoute = ({ children }: Props) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
