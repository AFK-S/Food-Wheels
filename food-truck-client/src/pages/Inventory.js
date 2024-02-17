import React from "react";
import ReactApexChart from "react-apexcharts";

const inventory = () => {

  const data = {
    series: [20, 40],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Purchased", "Sales"],
      colors: ["#000000", "#808080"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "bottom", // Set the legend position to "bottom"
      },
    },
  };
  return <div className="container-fluid inventory h-100">
    <div className="row h-100">
      <div className="col-lg-8">
        <div className="c-card" style={{
          height: "92%",
          overflow: "auto",
        }}>
          <table class="table">
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
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div className="col-lg-4">
        <div className="c-card">
          <div id="chart">
            <div className="ms-2 mb-4">
              <h5>Inventory Statistics</h5>
              <p className="mt-3">
                Total Items : <b> {60}</b>
              </p>
              <div className="d-flex align-items-center ">
                <p className="mt-2">
                  Sales : <b> {40}</b>
                </p>
                <p className="mt-2 ms-3">
                  Purchased : <b> {20}</b>
                </p>
              </div>
            </div>
            <ReactApexChart
              options={data.options}
              series={data.series}
              type="donut"
            />
          </div>
        </div>
      </div>
    </div>

  </div>;
};

export default inventory;
