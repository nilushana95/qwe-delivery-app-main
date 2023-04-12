import React, { useEffect, useState } from "react";
import {
  Routes as ReactRoutes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Users from "./pages/User/Users";
import Routes from "./pages/Routes/Routes";
import Deliveries from "./pages/Delivery/Deliveries";

const AuthLayout = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // pass current location to redirect back
    />
  );
};
const Router = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      <Route element={<AuthLayout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/routes" element={<Routes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/deliveries" element={<Deliveries />} />
      </Route>
    </ReactRoutes>
  );
};
export default Router;
