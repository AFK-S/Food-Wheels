import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Cart from "./Cart.js";
import TopBar from "../components/TopBar/TopBar.js";
import './Page.css'

const MainLayout = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <div className="m-0">
        <TopBar cart={cart} />
        <div className="app-body px-3">
          <Routes>
            <Route path="/" index element={<Home cart={cart} setCart={setCart} />} />
            <Route path="/cart" index element={<Cart cart={cart} setCart={setCart} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
