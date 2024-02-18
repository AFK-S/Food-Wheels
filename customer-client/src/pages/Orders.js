import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import {
  TextInput,
  Checkbox,
  Group,
  Box,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Orders = () => {
  const [cookies] = useCookies(["customer_id"]);
  const form = useForm({
    initialValues: {
      feedback: "",
      rate: 0,
      sector: "",
    },
  });
  const [rateModal, setRateModal] = useState(false);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/order/customer/${cookies.customer_id}`,
          {
            signal,
          }
        );
        setOrders(data.data);
        console.log(data.data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        alert(err.response?.data?.message || err.message || err);
      }
    })();
    return () => controller.abort();
  }, []);

  const handleFeedback = async (order_id) => {
    setRateModal(true);
    try {
      await axios.post(`/api/order/feedback-rating/${order_id}`, {
        feedback: form.values.feedback,
        rating: form.values.rate,
        sector: form.values.sector,
      });
      form.reset();
    } catch (err) {
      alert(err.response?.data?.message || err.message || err);
    }
    setRateModal(false);
  };

  return (
    <div className="orders">
      <div className="d-flex align-items-center">
        <button
          className="black-btn me-2 d-flex align-items-center justify-content-center"
          onClick={() => {
            navigate("/");
          }}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center"
          }}
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <h4 className="my-3">My Orders</h4>
      </div>
      {orders.map((order) => (
        <div className="order-cards p-3 my-3" key={order._id}>
          <div className="d-flex align-items-center justify-content-between">
            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Order ID: {order._id}</p>

            <p>{order.createdAt}</p>
          </div>
          {order.items.map((item) => (
            <div className="list mt-3">
              <p>
                {item.dish_name} (x{item.quantity})
              </p>
            </div>
          ))}
          <button className="black-btn mt-4 p-2" onClick={handleFeedback}>
            Give Feedback
          </button>
        </div>
      ))}
      <Modal
        opened={rateModal}
        onClose={() => setRateModal(false)}
        title="Give Feedback"
        centered
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Select
            style={{
              borderRadius: "20px",
            }}
            withAsterisk
            className="my-3"
            label="Sector"
            placeholder="Pick value"
            data={["hygiene", "taste", "experience"]}
            {...form.getInputProps("sector")}
          />
          <Select
            withAsterisk
            style={{
              borderRadius: "20px",
            }}
            className="my-3"
            label="Rate"
            placeholder="Pick value"
            data={["0", "1", "2", "3", "4", "5"]}
            {...form.getInputProps("rate")}
          />
          <Textarea
            className="mt-4"
            withAsterisk
            label="Feedback"
            radius="md"
            autosize
            minRows={6}
            placeholder="your@email.com"
            {...form.getInputProps("feedback")}
          />
          <button className="black-btn mt-3">Submit</button>
        </form>
      </Modal>

    </div>
  );
};

export default Orders;
