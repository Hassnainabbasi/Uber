import React, { createContext, useContext, useState } from "react";
export const CaptainDataContext = createContext();

export const useCaptain = () => {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }
  return context;
};

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateCaptain = (captainData) =>{
    setCaptain(captainData)
  }
  const value = {
    captain,
    setCaptain,
    loading,
    setLoading,
    error,
    setError,
    updateCaptain
  }
  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  )
};
