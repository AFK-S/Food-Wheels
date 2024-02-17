import React, { } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import TopBar from "../components/TopBar/TopBar.js";
import './Page.css'

const MainLayout = () => {

  return (
    <>
      <div className="m-0">
        <TopBar />
        <div className="app-body px-3">

          <Routes>
            <Route path="/" index element={<Home />} />
          </Routes>
        </div>

      </div>
    </>
  );
};

export default MainLayout;
