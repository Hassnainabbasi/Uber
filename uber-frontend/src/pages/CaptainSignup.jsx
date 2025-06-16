import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../constant/image";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import BASE_URL from "../../constant";

export const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const captaindata = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vechile: {
        vechileType: vehicleType,
        capacity: Number(capacity),
        plate,
        color,
      },
    };

    const res = await axios.post(`${BASE_URL}captains/register`, captaindata);
    if (res.status === 201) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-login");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleType("");
    setCapacity("");
    setPlate("");
    setColor("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img className="w-20 mb-5" src={images.logo} />
          <form onSubmit={handleSumbit}>
            <h3 className="text-lg font-medium mb-2">
              What's our Captain name
            </h3>
            <div className="flex gap-4 ">
              <input
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
              />
              <input
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">
              What's our Captain's email
            </h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
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
              placeholder="password"
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-7">
              <div className="w-1/2">
                <select
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
              <div className="w-1/2">
                <input
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg"
                  type="number"
                  min="1"
                  placeholder="Capacity"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-7">
              <div className="w-1/2">
                <input
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg"
                  type="text"
                  placeholder="Plate Number"
                />
              </div>
              <div className="w-1/2">
                <input
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg"
                  type="text"
                  placeholder="Color"
                />
              </div>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
              Create Captain Account
            </button>
            <p className="text-center">
              Already have an account?
              <Link to={"/captain-login"} className="text-blue-600">
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
