import React, { useState } from "react";
import { Badge } from '@mantine/core';

const Dashboard = () => {
  const [status, setStatus] = useState(1);

  const handleStatusChange = () => {
    if (status === 3) {
      return;
    }
    setStatus(status + 1);
  };

  const orders = [
    {
      id: 1,
      items: [
        {
          id: 1,
          name: "Burger",
          quantity: 1
        },
        {
          id: 2,
          name: "Pizza",
          quantity: 1
        },
        {
          id: 3,
          name: "Burger",
          quantity: 1
        },
        {
          id: 4,
          name: "Burger",
          quantity: 1
        }
      ],
      status: 1
    }
  ];

  const scheduled_orders = [
    {
      id: 1,
      time: "8:00 PM",
      items: [
        {
          id: 1,
          name: "Burger",
          quantity: 1
        },
        {
          id: 2,
          name: "Pizza",
          quantity: 1
        },
        {
          id: 3,
          name: "Burger",
          quantity: 1
        },
        {
          id: 4,
          name: "Burger",
          quantity: 1
        }
      ],
      status: 1
    },
    {
      id: 1,
      time: "8:00 PM",
      items: [
        {
          id: 1,
          name: "Burger",
          quantity: 1
        },
        {
          id: 2,
          name: "Pizza",
          quantity: 1
        },
        {
          id: 3,
          name: "Burger",
          quantity: 1
        },
        {
          id: 4,
          name: "Burger",
          quantity: 1
        }
      ],
      status: 1
    },
    {
      id: 1,
      time: "8:00 PM",
      items: [
        {
          id: 1,
          name: "Burger",
          quantity: 1
        },
        {
          id: 2,
          name: "Pizza",
          quantity: 1
        },
        {
          id: 3,
          name: "Burger",
          quantity: 1
        },
        {
          id: 4,
          name: "Burger",
          quantity: 1
        }
      ],
      status: 1
    },
    {
      id: 1,
      time: "8:00 PM",
      items: [
        {
          id: 1,
          name: "Burger",
          quantity: 1
        },
        {
          id: 2,
          name: "Pizza",
          quantity: 1
        },
        {
          id: 3,
          name: "Burger",
          quantity: 1
        },
        {
          id: 4,
          name: "Burger",
          quantity: 1
        }
      ],
      status: 1
    },
  ];

  // Filter orders excluding those with status 3
  const pendingOrders = orders.filter((order) => order.status !== 3);

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
                  90
                </h1>
              </div>
              <div className="col-md-8 p-0">
                <div className="c-card ms-lg-3">
                  <h5>Scheduled Order</h5>
                  <div className="divider my-2"></div>
                  <div className="d-flex align-items-center justify-content-start" style={{
                    width: "100%",
                    overflowX: "auto",
                  }}>

                    {
                      scheduled_orders.map((order) => {
                        return <div key={order.id} className="c-card p-3 mt-3 sc-card m-0 me-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6>Order ID : #{order.id}</h6>
                            <Badge color="#000">{order.time}</Badge>
                          </div>


                          <div className="divider my-2"></div>
                          <div className="order-list my-2 ps-2 ">
                            {
                              order.items.map((item) => {
                                return <p key={item.id}>{item.name} (x {item.quantity})</p>;
                              })
                            }
                          </div>
                        </div>;
                      }
                      )
                    }
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
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colSpan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 h-100 p-0 ps-md-3 mt-3 mt-md-0">
            <div className="c-card order-view p-0" style={{ overflow: "hidden" }}>
              <div className="p-4 py-3 pb-2">
                <h3>Orders Pending ({pendingOrders.length}) </h3>
                <div className="divider my-2"></div>
              </div>
              <div className="orders-scroll" style={{ height: "87%", overflow: "auto" }}>
                {pendingOrders.map((order) => (
                  <div key={order.id} className="c-card mt-2 order-cards mb-4">
                    <h6>Order ID : #{order.id}</h6>
                    <div className="order-list my-2 ps-2 ms-2">
                      {order.items.map((item) => (
                        <p key={item.id}>
                          {item.name} (x {item.quantity})
                        </p>
                      ))}
                    </div>
                    <div className="timeline d-flex align-items-center justify-content-between mt-3">
                      <div className={`dot ${status >= 1 ? "active" : ""}`}>
                        <i className="fa-solid fa-hourglass-start"></i>
                      </div>
                      <div className="line"></div>
                      <div className={`dot ${status >= 2 ? "active" : ""}`}>
                        <i className="fa-solid fa-box"></i>
                      </div>
                      <div className="line"></div>
                      <div className={`dot ${status === 3 ? "active" : ""}`}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </div>
                    {status !== 3 && (
                      <button className="black-btn mt-3" onClick={handleStatusChange}>
                        Next
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
