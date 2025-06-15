import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../../constant";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {
  const token = localStorage.getItem("token");
  console.log("token →", token); 
  console.log("URL →", `${BASE_URL}users/logout`);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async() => {
      try {
       const response = await axios
         .post(`${BASE_URL}users/logout`, {},
            {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         })
         console.log("res.status →", response.status); 
         console.log("res.data →", response.data); 
         if (response.status === 200) {
           localStorage.removeItem("token");
           navigate("/login");  
         }
      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
      }
    };
    logoutUser();
  }, []);

  return (
    <div>
      <h1> UserLogout</h1>
    </div>
  );
};
