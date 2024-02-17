import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import SideNavigation from "../components/SideNavigation/SideNavigation.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "../slice/UserSlice";
import { useCookies } from "react-cookie";
import TopBar from "../components/TopBar/TopBar.js";
import { useState } from "react";
import MobileNav from "../components/MobileNav/MobileNav.js";
import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Feedback from "./Feedback";
import Inventory from "./Inventory.js";
import TruckRoute from "./Route.js";
import Statistic from "./Statistics.js";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   if (!cookies.token || !cookies.userId) {
  //     removeCookie("token");
  //     removeCookie("userId");
  //     dispatch(logoutUser());
  //     window.location.href = "/login";
  //   }
  //   dispatch(fetchUser(cookies.token))
  //     .unwrap()
  //     .catch((error) => {
  //       console.error("Failed to fetch user data: ", error);
  //       navigate("/login");
  //     });
  // }, [dispatch, navigate]);

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row g-0">
          <div className="d-block d-md-none mobile-menu">
            <MobileNav isMenuOpen={isMenuOpen} ToggleMenu={ToggleMenu} />
          </div>
          <div
            className="d-none d-md-flex col-md-4 col-lg-3 p-3 py-4  align-items-center justify-content-center"
            style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
          >
            <SideNavigation />
          </div>
          <div className="col-md-8 col-lg-9 px-4 px-md-0 py-4 pe-md-3 ">
            <TopBar ToggleMenu={ToggleMenu} />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="/feedbacks" element={<Feedback />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/route" element={<TruckRoute />} />
              <Route path="/statistics" element={<Statistic />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
