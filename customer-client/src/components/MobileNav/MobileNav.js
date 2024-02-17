import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slice/UserSlice.js";
import { useCookies } from "react-cookie";
import "./MobileNav.css";

const MobileNav = ({ isMenuOpen, ToggleMenu }) => {
  const [cookies, removeCookie] = useCookies(["token", "userId"]);

  //   const handleLogout = () => {
  //     removeCookie("token");
  //     removeCookie("userId");
  //     dispatch(logoutUser());
  //     window.location.href = "/login";
  //   };

  const navs = [
    {
      name: "Home",
      path: "",
      icon: "fa-solid fa-house",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "fa-solid fa-display",
    },
    {
      name: "Member Info",
      path: "/member-info",
      icon: "fa-solid fa-user",
    },
    {
      name: "Edit Plans",
      path: "/edit-plans",
      icon: "fa-solid fa-chart-simple",
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: "fa-solid fa-user-clock",
    },
    // {
    //   name: "Get Invoice",
    //   path: "/invoice",
    //   icon: "fa-solid fa-file-invoice",
    // },
  ];

  return (
    <div className={`mobileNav ${isMenuOpen ? "active" : ""}`}>
      <div
        className="close-btn black-btn"
        onClick={ToggleMenu}
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          borderRadius: "30%",
          width: "40px",
          height: "40px",
          position: "absolute",
          right: "1.8rem",
          top: "1.8rem",
          cursor: "pointer",
        }}
      >
        <i
          className="fa-solid fa-x"
          style={{
            fontWeight: "700",
            fontSize: "0.8rem",
          }}
        ></i>
      </div>
      <div className="navigation rounded  px-4 d-flex flex-column">
        <div style={{ overflow: "auto", marginTop: "5rem" }}>
          {navs.map((e, index) => {
            const { name, path, icon } = e;
            return (
              <NavLink
                to={path}
                className="navlink my-2 rounded-s"
                key={index}
                onClick={ToggleMenu}
              >
                <i className={`me-2 ms-2 ${icon}`}></i>
                <p>{name}</p>
              </NavLink>
            );
          })}
        </div>

        <div className="pb-4">
          <div className="divider my-3"></div>
          <NavLink
            to="/new-member"
            className="navlink my-2 rounded-s"
            onClick={ToggleMenu}
          >
            <i className="fa-solid fa-user-plus me-2 ms-2"></i>
            <p>New Member</p>
          </NavLink>
          <button
            className="logout-btn flexbox px-3 p-2 w-100 rounded-s"
            // onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket me-2 ms-2"></i>
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
