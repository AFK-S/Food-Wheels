import React, { useState } from 'react';
import Burger from '../assets/Burger.png';
import Pizza from '../assets/Pizza.png';
import Pasta from '../assets/Pasta.png';
import Fries from '../assets/Fries.png';
import ItemInfoCard from '../components/ItemInfoCard/ItemInfoCard';

const Home = ({ cart, setCart }) => {

    const [activeFilter, setActiveFilter] = useState("All");
    const [setsearchQuery, setSetsearchQuery] = useState("");
    const [currSelectedItem, setCurrSelectedItem] = useState(null);
    const [infoMenu, setInfoMenu] = useState();
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

    const image1 = "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2023-05/BK.jpg";
    const image2 = "https://cdn1.vectorstock.com/i/1000x1000/07/40/fast-food-best-daily-offer-banner-template-vector-26320740.jpg";
    const image3 = "https://lh3.googleusercontent.com/PlzkCU1UbJk45WD-8VjHSp_rmoJX3bUKKUDcoo97dcKivVWqFIVI7gDkwX_E1fWAMSWU1Htc-kIYegCmDrlkeHGv9pBybw3zw22ehB4P=s750";

    const filters = ["All", "Burger", "Pizza", "Pasta", "Burger", "Pizza", "Pasta"];

    const menuItems = [
        {
            name: "Burger",
            image: Burger,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Pizza",
            image: Pizza,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Pasta",
            image: Pasta,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Fries",
            image: Fries,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Burger",
            image: Burger,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Pizza",
            image: Pizza,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Pasta",
            image: Pasta,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        },
        {
            name: "Fries",
            image: Fries,
            price: 399,
            discount: 499,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos quaerat praesentium ratione reiciendis veritatis recusandae perferendis vero quibusdam. Modi."
        }
    ];

    return (
        <div className='home py-2'>
            <div className="search-bar p-2 px-3">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder='Search' className='ms-2' />
            </div>

            <div className="carousel my-3">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner rounded overflow-hidden" style={{
                        backgroundColor: "#fff",
                        height: "200px"
                    }} >
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
                    <div className={`filter ${filter === activeFilter ? "active" : ""}`} onClick={() => setActiveFilter(filter)} key={index}>
                        <p>{filter}</p>
                    </div>
                ))}
            </div>

            <div className="menu-items container-fluid p-0">
                <div className="row gy-4">
                    {menuItems.map((item, index) => (
                        <div className="col-6" key={index} onClick={(e) => {
                            e.preventDefault();
                            setCurrSelectedItem(item);
                            setInfoMenu(true);
                        }}>
                            <div className="menu-card" style={{
                                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
                            }}>
                                <img src={item.image} alt="" className='img-fluid mt-2' />
                                <p className='mt-4 mb-2 px-1'>{item.name}</p>
                                <div className="details  d-flex align-items-center px-1">
                                    <div >
                                        <h5 style={{ fontWeight: 600 }}>₹{item.price}</h5>
                                    </div>
                                    <div className="ms-1">
                                        <s><p style={{ fontSize: "10px" }}>₹{item.discount}</p></s>
                                    </div>
                                </div>
                                <div className='add-to'>
                                    <button><i className="fa-solid fa-plus m-0 p-0"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <ItemInfoCard item={currSelectedItem} infoMenu={infoMenu} setInfoMenu={setInfoMenu} cart={cart} setCart={setCart} />
                </div>
            </div>
        </div>
    );
}

export default Home;
