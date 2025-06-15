import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../constant/image";
import axios from "axios";
import BASE_URL from "../../constant";
import { UserDataContext } from "../context/userContext";

export const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const { user, setUser } = useContext(UserDataContext);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    setUserData(newUser);

    const res = await axios.post(`${BASE_URL}users/register`, newUser);
    if (res.status === 201) {
      const data = res.data;
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/login");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img className="w-20 mb-5" src={images.logo} />
          <form onSubmit={handleSumbit}>
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
            <div className="flex gap-4 ">
              <input
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="name"
                name=""
                placeholder="First name"
                id=""
              />
              <input
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="name"
                name=""
                placeholder="Last Name"
                id=""
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
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
              Create account
            </button>
            <p className="text-center">
              Already have an account?
              <Link to={"/login"} className="text-blue-600">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[12px] leading-tight">
            {" "}
            This site is protected by the reCAPTCHA and the
            <span className="underline"> Google Privacy Policy</span> and{" "}
            <span className="underline">and Terms of Service apply</span>.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
