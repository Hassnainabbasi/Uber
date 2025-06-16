import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../constant/image";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import BASE_URL from "../../constant";

export const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)

  const handleSumbit = async(e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };
 
    const res = await axios.post(`${BASE_URL}captains/login`, captain);
    if (res.status === 200) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    } else {
      console.error("Login failed:", res.data.message);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-10" src={images.logo} />
        <form onSubmit={handleSumbit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="email"
            name=""
            placeholder="email@example.com"
            id=""
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="password"
            name=""
            placeholder="password"
            id=""
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center">
            Join a fleet?
            <Link to={"/captain-signup"} className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/login"}>
          <button className="bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Sign in as User
          </button>
        </Link>
      </div>
    </div>
  );
};
