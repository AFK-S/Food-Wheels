import React, { useState, useEffect } from "react";
import "./TopBar.css";

const TopBar = ({ ToggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
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

  return (
    <>
      <div
        className={`topbar container-fluid py-3  py-md-2 mb-3 p-2 px-md-3 ${isScrolled ? "active" : ""
          }`}
      >
        <div className="row w-100 flexbox">
          <div className="col-9 col-md-10 d-flex align-items-center ">
            <i
              onClick={ToggleMenu}
              className="fa-solid fa-bars me-3 d-block d-md-none"
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
            ></i>
            <p className="fw-bold title">Food-Wheels</p>
          </div>
          <div
            className="col-3 col-md-2"
            style={{ display: "flex", justifyContent: "end" }}
          >
            {/* <div className="avatar" style={{ border: "2px solid #000" }}>
              <img className="img-fluid" src={AFS} alt="user" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
