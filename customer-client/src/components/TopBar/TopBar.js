import React from "react";
import "./TopBar.css";

const TopBar = ({ ToggleMenu }) => {
  return (
    <>
      <div className="topbar container-fluid mb-3 p-2 px-md-3">
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
