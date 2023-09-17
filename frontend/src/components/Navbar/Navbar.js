import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/logintask";
import defaultImage from "./Default_pfp.svg";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const googleObj = JSON.parse(localStorage.getItem("googleUserObj"));

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("googleUserObj");
    setShowDropDown(false);
    navigate("/");
  };
  return (
    <nav className="main-navbar">
      <div
        className={`${
          showDropDown ? "profileDropdown" : "profileDropdown hide"
        }`}
      >
        <div className="profileDropdownContent" onClick={handleLogout}>
          LOGOUT
        </div>
      </div>
      <Link to="/">
        <div className="brand-title">MEGALIST</div>
      </Link>
      {user ? (
        <>
          <img
            src={googleObj ? googleObj.picture : defaultImage}
            className="profilePic"
            alt="Profile Pic"
            onClick={() => setShowDropDown(!showDropDown)}
          />
          <div
            className="navbarUsername"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {googleObj ? googleObj.given_name : user}
          </div>
        </>
      ) : (
        /*<div className="login-signup" onClick={handleLogout}>
          Logout
      </div>*/

        <div className="login-signup">
          <ul>
            <li>
              <Link to="/auth?mode=login">Login</Link>
            </li>
            <li>
              <Link to="/auth?mode=signup">Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
