import React from "react";
import { Navigate } from "react-router-dom";

let token = localStorage.getItem("token");

const PrivateRoutes = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;