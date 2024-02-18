const OrderSchema = require("../models/order.model");
const fs = require("fs");

const socket = (io) => {
  fs.watch("cache.json", async (eventType) => {
    if (eventType === "change") {
      const location = await JSON.parse(fs.readFileSync("./cache.json"));
      io.emit(
        "Display_Truck_Location",
        location || {
          latitude: 0,
          longitude: 0,
        }
      );
    }
  });
  io.on("connection", (socket) => {
    socket.on("Set_Truck_Location", async (coordinates) => {
      fs.writeFileSync("./cache.json", JSON.stringify(coordinates));
    });

    socket.on("Get_Truck_Location", async () => {
      const location = await JSON.parse(fs.readFileSync("./cache.json"));
      io.emit(
        "Display_Truck_Location",
        location || { latitude: 0, longitude: 0 }
      );
    });

    socket.on("Push_Notification", async (details) => {
      io.emit("Send_Notification", {
        type: "expo",
        title: "title",
        body: "body",
        data: { data: "goes here" },
      });
    });

    // socket.on("Order_Placed", async () => {
    //   io.emit("Fetch_Orders");
    // });

    socket.on("Get_My_Queue", async (customer_id) => {
      const orders = await OrderSchema.find({
        status: {
          $nin: ["delivered", "cancelled"],
        },
      })
        .sort({
          createdAt: -1,
        })
        .lean();

      const queue = orders
        .map((order) => {
          if (order.customer_id.toString() === customer_id) {
            return {
              queue: orders.indexOf(order),
              estimated_time: orders.indexOf(order) * 10,
              status: order.status,
              order_id: order._id,
              createdAt: order.createdAt,
            };
          }
        })
        .filter((order) => order);

      socket.emit("Display_My_Queue", queue);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected");
    });
  });
};

module.exports = socket;
