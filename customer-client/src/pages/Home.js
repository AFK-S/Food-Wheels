import React, { useState, useEffect } from "react";
import ItemInfoCard from "../components/ItemInfoCard/ItemInfoCard";
import axios from "axios";
import { Modal, Button } from '@mantine/core';

import { useStateContext } from "../context/StateContext";

const Home = ({ cart, setCart }) => {
  const { socket } = useStateContext();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currSelectedItem, setCurrSelectedItem] = useState(null);
  const [infoMenu, setInfoMenu] = useState();
  const [shareModal, setShareModal] = useState(false)
  const colors = [
    "#C6E6B3", // Light green
    "#B4E5E7", // Light blue
    "#E6E1B2", // Light yellow
    "#B3E6C1", // Light turquoise
    "#FFD1DC", // Light pink
    "#D5A6BD", // Light purple
    "#F7CAC9", // Light peach
    "#FFE4E1", // Light rose
    "#FFA07A", // Light salmon
    "#F0E68C", // Khaki
    "#FFB6C1", // Light pink
    "#87CEEB", // Sky blue
    "#AFEEEE", // Pale turquoise
    "#F0FFFF", // Azure
    "#E0FFFF", // Light cyan
  ];

  const image1 =
    "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2023-05/BK.jpg";
  const image2 =
    "https://cdn1.vectorstock.com/i/1000x1000/07/40/fast-food-best-daily-offer-banner-template-vector-26320740.jpg";
  const image3 =
    "https://lh3.googleusercontent.com/PlzkCU1UbJk45WD-8VjHSp_rmoJX3bUKKUDcoo97dcKivVWqFIVI7gDkwX_E1fWAMSWU1Htc-kIYegCmDrlkeHGv9pBybw3zw22ehB4P=s750";

  const filters = ["All", "Veg", "Non-Veg", "Jain"];

  const [dishes, setDishes] = useState([]);
  const [truckLocation, setTruckLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    socket.on("Display_Truck_Location", (coordinates) => {
      console.log("Truck Location: ", coordinates);
      setTruckLocation(coordinates);
    });

    socket.emit("Get_Truck_Location");

    return () => {
      socket.off("Display_Truck_Location");
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const { data } = await axios.get("/api/dish", {
          signal,
        });
        setDishes(data.data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        alert(err.response?.data?.message || err.message || err);
      }
    })();
    return () => controller.abort();
  }, []);

  const handleFacebookShare = () => {
    const shareUrl = "http://localhost:3000/"; // Replace with your website URL
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleTwitterShare = () => {
    const shareUrl = "http://localhost:3000/"; // Replace with your website URL
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    const shareText = "Check out this awesome website: http://localhost:3000/"; // Replace with your text and website URL
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div className="home py-2">
      <div className="search-bar p-2 px-3 d-flex align-items-center">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search"
          className="ms-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="carousel my-3">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div
            className="carousel-inner rounded overflow-hidden"
            style={{
              backgroundColor: "#fff",
              height: "200px",
            }}
          >
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100 img-fluid" alt="..." />
            </div>
            <div className="carousel-item ">
              <img src={image2} className="d-block w-100 img-fluid" alt="..." />
            </div>
            <div className="carousel-item ">
              <img src={image3} className="d-block w-100 img-fluid" alt="..." />
            </div>
          </div>
        </div>
      </div>

      <div className="filters d-flex my-4">
        {filters.map((filter, index) => (
          <div
            className={`filter ${filter === activeFilter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
            key={index}
          >
            <p>{filter}</p>
          </div>
        ))}
      </div>

      <div className="menu-items container-fluid p-0">
        <div className="row gy-4">
          {dishes
            .filter((item) => {
              // Apply filter
              if (activeFilter === "All") return true;
              return item.food_type === activeFilter.toLowerCase();
            })
            .filter((item) => {
              // Apply search query filter
              return item.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            })
            .map((item, index) => (
              <div
                className="col-6"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrSelectedItem(item);
                  setInfoMenu(true);
                }}
              >
                <div
                  className="menu-card"
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <button className="black-btn" style={{
                    position: "absolute",
                    right: "10px",
                    fontSize: "10px",
                    width: "30px",
                    height: "30px",
                    padding: 0,
                    borderRadius: "10px",
                    background: "white",
                    color: "#000"
                  }} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShareModal(true);
                  }} >
                    <i class="fa-solid fa-share-from-square"></i>
                  </button>
                  <img src={item.image.url} alt="" className="img-fluid mt-2" />
                  <p className="mt-4 mb-2 px-1">{item.name}</p>
                  <div className="details  d-flex align-items-center px-1">
                    <div>
                      <h5 style={{ fontWeight: 600 }}>
                        ₹{item.price.original}
                      </h5>
                    </div>
                    <div className="ms-1">
                      <s>
                        <p style={{ fontSize: "10px" }}>
                          ₹{item.price.discounted}
                        </p>
                      </s>
                    </div>
                  </div>
                  <div className="add-to">
                    <button>
                      <i className="fa-solid fa-plus m-0 p-0"></i>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          <ItemInfoCard
            item={currSelectedItem}
            infoMenu={infoMenu}
            setInfoMenu={setInfoMenu}
            cart={cart}
            setCart={setCart}
          />
        </div>
      </div>

      <div className="tracking-order">
        <div className="d-flex align-items-center justify-content-between">
          <p>Order ID : #1233</p>
          <p>5th in Queue</p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>Created At : 12:45PM</p>
          <p
            style={{
              color: "green",
              fontWeight: 600,
            }}
          >
            In Process
          </p>
        </div>
        <button className="black-btn mt-3 w-100">View Truck Location</button>
      </div>
      <Modal opened={shareModal} onClose={() => {
        setShareModal(false);
      }} title="Share">
        <div className="share-mod d-flex align-items-center justify-content-between">
          <button onClick={handleFacebookShare}><i class="fa-brands fa-facebook"></i></button>
          <button onClick={handleTwitterShare}><i class="fa-brands fa-x-twitter"></i></button>
          <button onClick={handleWhatsAppShare}><i class="fa-brands fa-whatsapp"></i></button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
