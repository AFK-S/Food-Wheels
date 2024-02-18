import React, { useState, useEffect } from "react";
import { Badge } from "@mantine/core";
import axios from "axios";
import { useStateContext } from "../context/StateContext";

const Dashboard = () => {
  const { socket } = useStateContext();

  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    socket.on("Fetch_Orders", async () => {
      setRefresh((prev) => !prev);
    });

    return () => {
      socket.off("Fetch_Orders");
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const { data } = await axios.get("/api/order/today/orders", {
          signal,
        });
        setPendingOrders(data.data?.order_pending || []);
        setCompletedOrders(data.data?.order_completed || []);
      } catch (err) {
        if (err.name === "CanceledError") return;
        alert(err.response?.data?.message || err.message || err);
      }
    })();
    return () => controller.abort();
  }, [refresh]);

  const handleStatus = async (order_id, status) => {
    try {
      const { data } = await axios.put(`/api/order/status/${order_id}`, {
        status: status === "placed" ? "preparing" : "delivered",
      });
      console.log(data);
      setPendingOrders((prev) =>
        prev.map((order) => {
          if (order._id === order_id) {
            order.status = status === "placed" ? "preparing" : "delivered";
          }
          return order;
        })
      );
    } catch (err) {
      alert(err.response?.data?.message || err.message || err);
    }
  };

  return (
    <>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <div className="row gy-3">
              <div className="col-md-4 c-card">
                <h5>Orders completed</h5>
                <div className="divider my-2"></div>
                <h1 style={{ fontSize: "5rem" }} className="text-center">
                  {completedOrders.length}
                </h1>
              </div>
              <div className="col-md-8 p-0">
                <div className="c-card ms-lg-3">
                  <h5>Scheduled Order</h5>
                  <div className="divider my-2"></div>
                  <div
                    className="d-flex align-items-center justify-content-start"
                    style={{
                      width: "100%",
                      overflowX: "auto",
                    }}
                  >
                    {completedOrders.map((order) => {
                      return (
                        <div
                          key={order._id}
                          className="c-card p-3 mt-3 sc-card m-0 me-3"
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h6>Order ID : #{order._id}</h6>
                            <Badge color="#000">{order.createdAt}</Badge>
                          </div>

                          <div className="divider my-2"></div>
                          <div className="order-list my-2 ps-2 ">
                            {order.items.map((item) => {
                              return (
                                <p key={item.dish_id}>
                                  {item.dish_name} (x {item.quantity})
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 c-card">
                <h5>All Orders</h5>
                <div className="divider my-2"></div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Total Order</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrders.map((order) => {
                      return (
                        <tr key={order._id}>
                          <th scope="row">{order._id}</th>
                          <td>{order.customer_name}</td>
                          <td>{order.items.length}</td>
                          <td>{order.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 h-100 p-0 ps-md-3 mt-3 mt-md-0">
            <div
              className="c-card order-view p-0"
              style={{ overflow: "hidden" }}
            >
              <div className="p-4 py-3 pb-2">
                <h3>
                  Orders Pending (
                  {
                    pendingOrders.filter((order) => {
                      return order.status !== "delivered";
                    }).length
                  }
                  )
                </h3>
                <div className="divider my-2"></div>
              </div>
              <div
                className="orders-scroll"
                style={{ height: "87%", overflow: "auto" }}
              >
                {pendingOrders
                  .filter((order) => {
                    return order.status !== "delivered";
                  })
                  .map((order) => {
                    return (
                      <div
                        key={order._id}
                        className="c-card mt-2 order-cards mb-4"
                      >
                        <h6>Order ID : #{order._id}</h6>
                        <div className="order-list my-2 ps-2 ms-2">
                          {order.items.map((item) => (
                            <p key={item.dish_id}>
                              {item.dish_name} (x {item.quantity})
                            </p>
                          ))}
                        </div>
                        <div className="timeline d-flex align-items-center justify-content-between mt-3">
                          <div
                            className={`dot ${order.status === "placed" ? "active" : ""
                              }`}
                          >
                            <i className="fa-solid fa-hourglass-start"></i>
                          </div>
                          <div className="line"></div>
                          <div
                            className={`dot ${order.status === "preparing" ? "active" : ""
                              }`}
                          >
                            <i className="fa-solid fa-box"></i>
                          </div>
                          <div className="line"></div>
                          <div
                            className={`dot ${order.status === "delivered" ? "active" : ""
                              }`}
                          >
                            <i className="fa-solid fa-check"></i>
                          </div>
                        </div>
                        <div className="my-2 mt-3">
                          <p>Ordered By : {order.customer_name}</p>
                        </div>
                        {order.status !== "delivered" && (
                          <button
                            className="black-btn mt-3"
                            onClick={() =>
                              handleStatus(order._id, order.status)
                            }
                          >
                            Next
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
