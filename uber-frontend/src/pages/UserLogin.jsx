import React, { useState } from "react";
import images from "../constant/image";
import { Link } from "react-router-dom";

export const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setUserData(data);
    console.log("console.log", userData);

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
            New here?
            <Link to={"/signup"} className="text-blue-600">
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/captain-login"}>
          <button className="bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Sign in as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};
