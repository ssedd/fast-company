import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/" aria-current="page">
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login" aria-current="page">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users" aria-current="page">
          Users
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
