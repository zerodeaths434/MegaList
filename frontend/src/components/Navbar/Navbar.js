import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/logintask";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  //console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("displayName");
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
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"
            className="profilePic"
            alt="Profile Pic"
            onClick={() => setShowDropDown(!showDropDown)}
          />
          <div
            className="navbarUsername"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {localStorage.getItem("displayName") || user}
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
