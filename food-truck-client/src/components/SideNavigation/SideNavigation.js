import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slice/UserSlice.js";
import { useCookies } from "react-cookie";

const SideNavigation = () => {
  const [cookies, removeCookie] = useCookies(["token", "userId"]);
  // const handleLogout = () => {
  //   removeCookie("token");
  //   removeCookie("userId");
  //   dispatch(logoutUser());
  //   window.location.href = "/login";
  // };

  const navs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "fa-solid fa-display",
    },
    {
      name: "Feedbacks",
      path: "/feedbacks",
      icon: "fa-solid fa-comments",
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: "fa-solid fa-boxes",
    },
    {
      name: "Route",
      path: "/route",
      icon: "fa-solid fa-route",
    },
    {
      name: "Statistics",
      path: "/statistics",
      icon: "fa-solid fa-chart-simple",
    },
  ];

  return (
    <div className="navigation rounded p-3 d-flex flex-column">
      <div style={{ overflow: "auto" }}>
        {navs.map((e, index) => {
          const { name, path, icon } = e;
          return (
            <NavLink to={path} className="navlink my-2 rounded-s" key={index}>
              <i className={`me-2 ms-2 ${icon}`}></i>
              <p>{name}</p>
            </NavLink>
          );
        })}
      </div>

      <div>
        <div className="divider my-3"></div>
        <NavLink to="/new-dish" className="navlink my-2 rounded-s ">
          <i className="fa-solid fa-burger me-2 ms-2"></i>
          <p>Add New Dish</p>
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
  );
};

export default SideNavigation;
