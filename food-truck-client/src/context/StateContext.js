import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

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
