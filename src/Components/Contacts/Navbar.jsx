import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    // Nav menu
    <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary text-light" >  
      <Link to="/" className="navbar-brand text-decoration-none ml-5 ">
        <h3 className="text-center  text-light ml-5 p-2 px-5 ">
          Contact List
        </h3>
      </Link>
    </nav>
  );
}

export default Navbar;
 