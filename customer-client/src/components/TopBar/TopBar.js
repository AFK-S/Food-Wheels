import React, { useState, useEffect } from "react";
import "./TopBar.css";
import { Avatar } from '@mantine/core';
import { useNavigate } from "react-router-dom";

const TopBar = ({ ToggleMenu, cart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const url = "https://t3.ftcdn.net/jpg/01/86/34/08/360_F_186340800_qlgVLkKLVy19r6SEL7RnniP1Yz6dmq8T.jpg"
  return (
    <>
      <div

        className={`topbar d-flex align-items-center justify-content-between  p-4 py-2 ${isScrolled ? "active" : ""
          }`}
      >
        <div className=" d-flex align-items-center">

          <Avatar src={url} alt="it's me" style={{
            borderRadius: "50%",
            marginRight: "10px"

          }} />
          <div className="d-flex align-items-center" style={{
            fontSize: "1.1rem"
          }}>
            <i class="fa-solid fa-location-dot me-2"></i>
            <p >D.J. Sanghvi</p>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="grey-btn me-2" onClick={() => navigate("/orders")}>
            {/* <div className="badge"></div> */}
            <i class="fa-solid fa-receipt"></i>
          </div>
          <div className="grey-btn" onClick={() => {
            navigate("/cart")
          }}>
            <div style={{
              backgroundColor: "yellow",
              borderRadius: "50%",
              position: "absolute",
              top: "-5px",
              right: "-5px",
              display: "flex !important",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontSize: "0.8rem",
              transform: "scale(1)",
              fontWeight: "600",
              width: "20px",
              height: "20px",
              textAlign: "center",
            }}>
              {cart?.length}
            </div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
