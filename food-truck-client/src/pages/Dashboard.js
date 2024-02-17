import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <h1>ok</h1>
          </div>
          <div className="col-md-6 col-lg-4 h-100">
            <div className="c-card order-view p-0">
              <div className="p-4 py-3 pb-2">

                <h3>Orders Pending</h3>
                <div className="divider my-2"></div>
              </div>
              <div className="orders-scroll " style={{
                height: "100%",
                overflow: "auto"

              }}>
                <div className="c-card mt-2  order-cards">
                  <h5>Order no.2</h5>
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
