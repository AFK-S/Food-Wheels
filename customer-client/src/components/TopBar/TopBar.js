import React, { useState, useEffect } from "react";
import "./TopBar.css";
import { Avatar } from '@mantine/core';

const TopBar = ({ ToggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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

        <div className="grey-btn">
          <div className="badge"></div>
          <i class="fa-regular fa-bell"></i>
        </div>
      </div>
    </>
  );
};

export default TopBar;
