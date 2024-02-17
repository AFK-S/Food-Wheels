const OrderSchema = require("../models/order.model");

const socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("Set_Truck_Location", async (coordinates) => {
      io.emit("Display_Truck_Location", coordinates);
    });

    socket.on("Push_Notification", async (details) => {
      io.emit("Send_Notification", {
        type: "expo",
        title: "title",
        body: "body",
        data: { data: "goes here" },
      });
    });

    socket.on("Order_Placed", async () => {
      io.emit("Fetch_Orders");
    });

    socket.on("Get_My_Queue", async (order_id) => {
      const orders = await OrderSchema.find({
        status: {
          $nin: ["completed", "cancelled"],
        },
      })
        .sort({
          createdAt: -1,
        })
        .lean();

      let count = 0;
      let status;
      orders.forEach((order) => {
        if (order._id.toString() === order_id) {
          status = order.status;
          return;
        }
        count++;
      });
      return {
        queue: count,
        estimated_time: count * 10,
        status,
      };
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected");
    });
  });
};

module.exports = socket;
