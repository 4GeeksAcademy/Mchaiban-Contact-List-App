// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";  

export const Navbar = () => (
  <nav className="navbar navbar-light bg-light shadow-sm">
    <div className="container">
      {/* This Link will take you to "/" which is where your Contacts view lives */}
      <Link className="navbar-brand" to="/">
        My Contacts
      </Link>
    </div>
  </nav>
);
