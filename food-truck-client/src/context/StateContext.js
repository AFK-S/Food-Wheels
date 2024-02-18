import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import io from "socket.io-client";

const StateContext = createContext();

const SERVER_URL = "http://localhost:8000";

const StateProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const [location, setLocation] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const [socket] = useState(() =>
    io(SERVER_URL, {
      transports: ["websocket"],
    })
  );

  useEffect(() => {
    socket.on("connect", async () => {
      setIsSocketConnected(true);
      console.log("connected");
    });
    socket.on("connect_error", (err) => {
      console.log(err);
    });
    socket.on("disconnect", () => {
      setIsSocketConnected(false);
      console.log("disconnected");
    });
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (!isSocketConnected) return;
    let watchId;
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("location chnaged");
          setLocation({
            latitude,
            longitude,
          });
          socket.emit("Set_Truck_Location", {
            latitude,
            longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isSocketConnected]);

  const toggleLoading = (state) => {
    setLoading(state);
  };

  useEffect(() => {
    const controller = new AbortController();

    return () => controller.abort();
  }, [fetchFlag]);

  const refreshFlag = () => {
    setFetchFlag((prev) => !prev);
  };

  const toggleMobileNav = (state) => {
    setMobileNav(state);
  };

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        alerts,
        setAlerts,
        refreshFlag,
        toggleMobileNav,
        mobileNav,
        toggleLoading,
        socket,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};

export default StateProvider;
