import React, { useState } from "react";
import images from "../constant/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constant";

export const ConfirmRidePopPannel = ({ setConfirmRidePopPannel, ride }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp);

    const res = await axios.post(
      `${BASE_URL}rides/start-ride`,
      {
        rideId: ride._id,
        otp: otp,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if(res.status === 200){
      setConfirmRidePopPannel(false)
      navigate('/captain-riding',{ state : { ride :ride } })
    }

  };
  return (
    <>
      <div className="">
        <h5
          onClick={() => setConfirmRidePopPannel(false)}
          className="p-1 text-center w-[93%] absolute top-0"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
        </h5>
        <h3 className="text-xl font-semibold mb-5">
          Confirm this ride to Start
        </h3>
        <div className="flex items-center justify-between mt-3 p-3 bg-yellow-400 rounded-xl">
          <div className="flex items-center gap-3">
            <img
              src={images.driver}
              className="h-12 w-12 rounded-full object-cover"
              alt=""
            />
            <h2 className="font-medium text-lg">
              {ride?.user?.fullName?.firstName +
                " " +
                ride?.user?.fullName?.lastName}
            </h2>
          </div>
          <p className="text-lg font-medium">2.2 KM</p>
        </div>
        <div className="flex justify-between items-center flex-col">
          <img className="h-20" src={images.car} alt="" />
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b">
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <h3 className="text-gray-600 text-sm -mt-1">{ride?.pickup}</h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">B-17/3</h3>
                <h3 className="text-gray-600 text-sm -mt-1">
                  {ride?.destination}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">Rs {ride?.fare}</h3>
                <h3 className="text-gray-600 text-sm -mt-1">Cash Cash</h3>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <input
                className="bg-[#eeeeee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-3 mb-5"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button
                type="submit"
                onClick={() => setConfirmRidePopPannel(false)}
                className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmRidePopPannel(false)}
                className="w-full mt-3 bg-red-600 text-white font-semibold p-2 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
