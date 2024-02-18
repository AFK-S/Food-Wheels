import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home.js";
import Cart from "./Cart.js";
import Orders from "./Orders.js";
import TopBar from "../components/TopBar/TopBar.js";
import "./Page.css";
import { useStateContext } from "../context/StateContext.js";

const MainLayout = () => {
  const { isLogin } = useStateContext();
  const [cart, setCart] = useState([]);
  const Navigate = useNavigate();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    if (!isLogin) {
      Navigate("/login");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <div className="m-0">
        <TopBar cart={cart} />
        <div className="app-body px-3">
          <Routes>
            <Route
              path="/"
              index
              element={<Home cart={cart} setCart={setCart} />}
            />
            <Route
              path="/cart"
              index
              element={<Cart cart={cart} setCart={setCart} location={location} />}
            />
            <Route
              path="/orders"
              index
              element={<Orders cart={cart} setCart={setCart} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
