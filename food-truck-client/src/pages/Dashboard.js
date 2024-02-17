import React, { useState } from "react";

const Dashboard = () => {
  const [status, setStatus] = useState(1);

  const handleStatusChange = () => {
    if (status === 3) {
      return;
    }
    setStatus(status + 1);
  };

  return (
    <>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <h1>ok</h1>
          </div>
          <div className="col-md-6 col-lg-4 h-100">
            <div className="c-card order-view p-0" style={{
              overflow: "hidden",

            }}>
              <div className="p-4 py-3 pb-2">
                <h3>Orders Pending</h3>
                <div className="divider my-2"></div>
              </div>
              <div
                className="orders-scroll"
                style={{
                  height: "87%",
                  overflow: "auto",

                }}
              >
                <div className="c-card mt-2 order-cards mb-4">
                  <h6>Order ID : #1233</h6>
                  <div className="order-list my-2 ps-2 ms-2">
                    <p>Burger (x 1)</p>
                    <p>Pizza (x 1)</p>
                    <p>Burger (x 1)</p>
                    <p>Burger (x 1)</p>
                  </div>
                  <div className="timeline d-flex align-items-center justify-content-between mt-3">
                    <div className={`dot ${status >= 1 ? "active" : ""}`} >
                      <i class="fa-solid fa-hourglass-start"></i>
                    </div>
                    <div className="line"></div>
                    <div className={`dot ${status >= 2 ? "active" : ""}`} >
                      <i class="fa-solid fa-box"></i>
                    </div>
                    <div className="line"></div>
                    <div className={`dot ${status === 3 ? "active" : ""}`} >
                      <i class="fa-solid fa-check"></i>
                    </div>
                  </div>
                  {
                    status !== 3 && (
                      <button className="black-btn mt-3" onClick={handleStatusChange} >Next</button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
