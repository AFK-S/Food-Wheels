import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Modal } from "@mantine/core";
import { TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const { data } = await axios.get("/api/inventory", {
          signal,
        });
        setInventories(data.data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        alert(err.response?.data?.message || err.message || err);
      }
    })();
    return () => controller.abort();
  }, []);

  const form = useForm({
    initialValues: {
      category: "",
      food_type: "",
      quantity: "",
    },
  });
  const [inventoryModal, setInventoryModal] = useState(false);
  const categories = [
    "burger",
    "pizza",
    "pasta",
    "fries",
    "ice-cream",
    "donut",
  ];
  const food_types = ["veg", "non-veg", "jain"];

  const data = {
    series: inventories.map((inventory) => inventory.quantity) || [],
    options: {
      chart: {
        type: "donut",
      },
      labels:
        inventories.map(
          (inventory) => `${inventory.category} (${inventory.food_type})`
        ) || [],
      colors: [
        "#000000",
        "#808080",
        "#C0C0C0",
        "#FF0000",
        "#800000",
        "#FFFF00",
      ],
      responsive: [
        {
          breakpoint: 380,
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
        position: "bottom",
      },
    },
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/inventory", form.values);
      form.reset();
      setInventoryModal(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message || err);
    }
  };

  return (
    <div className="container-fluid inventory h-100">
      <div className="row h-100">
        <div className="col-lg-8">
          <div
            className="c-card"
            style={{
              height: "92%",
              overflow: "auto",
            }}
          >
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Food Type</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((inventory) => (
                  <tr key={inventory._id}>
                    <th scope="row">1</th>
                    <td>{inventory.category}</td>
                    <td>{inventory.food_type}</td>
                    <td>{inventory.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4">
          <button
            className="black-btn mb-3"
            onClick={() => {
              setInventoryModal(true);
            }}
          >
            <i class="fas fa-plus"></i>
            Add Item
          </button>
          <div
            className="c-card"
            style={{
              overflow: "hidden",
            }}
          >
            <div id="chart">
              <div className="ms-2 mb-4">
                <h5>Inventory Statistics</h5>
                <p className="mt-3">
                  Total Items :{" "}
                  <b>
                    {inventories.reduce(
                      (acc, inventory) => acc + inventory.quantity,
                      0
                    )}
                  </b>
                </p>
                <div className="d-flex align-items-center flex-wrap gap-2">
                  {inventories.map((inventory) => (
                    <p className="mt-2">
                      {inventory.category} ({inventory.food_type}) :{" "}
                      <b> {inventory.quantity}</b>
                    </p>
                  ))}
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
      <Modal
        className="rounded"
        opened={inventoryModal}
        onClose={() => setInventoryModal(false)}
        title="Add Item"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            className="my-3"
            withAsterisk
            label="Category"
            placeholder="Select Category"
            data={categories}
            {...form.getInputProps("category")}
          />
          <TextInput
            className="my-3"
            type="number"
            withAsterisk
            label="Item Quantity"
            placeholder="Enter Item Quantity"
            {...form.getInputProps("quantity")}
          />
          <Select
            className="my-3"
            withAsterisk
            label="Food Type"
            placeholder="Select Food Type"
            data={food_types}
            {...form.getInputProps("food_type")}
          />

          <button className="black-btn mt-3">Add</button>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory;
