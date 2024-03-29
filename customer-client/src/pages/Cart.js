import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Cart = ({ cart, setCart, location }) => {
  const [cookies] = useCookies(["customer_id"]);
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price.discounted || item.price.original;
    });
    return totalPrice;
  };

  const tempLocation = {
    latitude: 19.1071733,
    longitude: 72.8373538,
  };

  const handleBookNow = async () => {
    try {
      const { data } = await axios.post("/api/order", {
        customer_id: cookies.customer_id,
        items: cart.map((item) => ({
          dish_id: item._id,
          quantity: 1,
          billing_price: item.price.discounted || item.price.original,
        })),
        total: calculateTotalPrice(),
        coordinates:
          location.latitude && location.longitude ? location : tempLocation,
        note: instructions,
      });
      console.log(data.data);
      setCart([]);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message || err);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="my-3">
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <button
          className="black-btn mt-3"
          style={{
            width: "100%",
            background: "transparent",
            color: "black",
            border: "1px solid black",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="my-3">
      <h1>Cart</h1>
      <div className="light-grey my-3 rounded p-2">
        {cart?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="d-flex align-items-center justify-content-between mb-3 px-3 py-2">
                <div className="d-flex align-items-center">
                  <div className="bg-white p-3 rounded">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="img-fluid"
                      style={{
                        height: "50px",
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="ms-3">
                    <h5>{item.name}</h5>
                    <p>₹{item.price.original}</p>
                  </div>
                </div>
                <div>
                  <button
                    className="black-btn"
                    style={{
                      background: "transparent",
                      color: "black",
                      border: "1px solid black",
                      width: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      aspectRatio: "1/1",
                    }}
                    onClick={() => {
                      setCart((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="divider mb-2"></div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="instructions" className="fw-semibold">
          Instructions
        </label>
        <input
          type="text"
          name="instructions"
          placeholder="Add instructions (if any)"
          style={{
            padding: "0.5rem",
            borderRadius: "14px",
          }}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      <div
        className="px-3"
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "0",
          width: "100%",
        }}
      >
        <div className="total-price p-3  d-flex justify-content-between align-items-center">
          <h5>Total Price:</h5>
          <h5>₹{calculateTotalPrice()}</h5>
        </div>

        <button
          className="black-btn"
          style={{
            width: "100%",
          }}
          onClick={handleBookNow}
        >
          Book Now
        </button>
        <button
          className="black-btn mt-3"
          style={{
            width: "100%",
            background: "transparent",
            color: "black",
            border: "1px solid black",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Cart;
