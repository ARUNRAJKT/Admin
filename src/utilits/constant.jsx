import React from "react";
import {
  FaHome,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

export const LinkItems = [
  { name: "Dashboard", url: "/dashboard", icon: <FaHome /> },
  { name: "Users", url: "/users", icon: <FaUsers />  },
  { name: "Admin", url: "/admins", icon: <FaUserTie />},
];
