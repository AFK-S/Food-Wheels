import React from 'react';
import './ItemInfoCard.css';

const ItemInfoCard = ({ item, infoMenu, setInfoMenu, cart, setCart }) => {
    const addToCart = (item) => {
        setCart((prev) => {
            return [...prev, item]
        })
        console.log(cart);
    }
    return (
        <>
            {infoMenu && (
                <div className="bg-overlay m-0" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    zIndex: "1000",
                    height: "100vh"
                }}></div>
            )}
            <div className={`infoMenu p-3 shadow ${infoMenu ? "active" : ""}`} style={{
                zIndex: "1000",
            }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3>
                            {item?.name}
                        </h3>
                    </div>
                    <button className='black-btn' style={{
                        width: "30px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        aspectRatio: "1/1"
                    }} onClick={() => setInfoMenu(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <img src={item?.image} alt={item?.name} className='img-fluid' />
                </div>
                <div className="details">
                    <div>
                        <p className='my-3'>{item?.description}</p>
                    </div>

                    <div>
                        <h5>₹{item?.price}</h5>
                    </div>
                    <div>
                        <s><p>₹{item?.discount}</p></s>
                    </div>
                    <div className="w-100 mt-4">
                        <button className='black-btn py-3' onClick={() => {
                            addToCart(item);
                            setInfoMenu(false);
                        }}>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemInfoCard;
