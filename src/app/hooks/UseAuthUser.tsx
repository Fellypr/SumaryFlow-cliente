"use client";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const UseAuth = () => {
    return useContext(AuthContext);
};
