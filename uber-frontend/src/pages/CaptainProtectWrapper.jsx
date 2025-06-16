import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import BASE_URL from "../../constant";

export const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}captains/profile`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }, 
          }
        );

        if (res.status === 200) {
          setCaptain(res.data); 
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth error →", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    fetchProfile();
  }, [token, navigate, setCaptain]);

  if (loading) return <div>Loading…</div>;

  return <>{children}</>;
};
