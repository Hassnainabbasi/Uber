import React from "react";
import images from "../constant/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constant";

export const FinishRide = ({ setFinishRide, rideData }) => {
  console.log(rideData, "thi");
  const navigate = useNavigate()
  const endRide = async () => {
    const res = await axios.post(
      `${BASE_URL}rides/end-ride`,
      {
        rideId: rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      setFinishRide(false);
      navigate('/captain-home')

    }
  };
  return (
    <div className="h-screen">
      <h5 className="p-1 text-center w-[93%] absolute top-0">
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-xl font-semibold mb-5">Finsih this Ride</h3>
      <div className="flex items-center justify-between mt-3 p-3 bg-yellow-400 rounded-xl">
        <div className="flex items-center gap-3">
          <img
            src={images.driver}
            className="h-12 w-12 rounded-full object-cover"
            alt=""
          />
          <h2 className="font-medium text-lg">
            {rideData?.user?.fullName?.firstName +
              " " +
              rideData?.user?.fullName?.lastName}
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
              <h3 className="text-gray-600 text-sm -mt-1">
                {rideData?.pickup}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">B-17/3</h3>
              <h3 className="text-gray-600 text-sm -mt-1">
                {rideData?.destination}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">{rideData?.fare}</h3>
              <h3 className="text-gray-600 text-sm -mt-1">Cash Cash</h3>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={() => {
              endRide();
            }}
            className="w-full flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg"
          >
            Finish Ride
          </button>
          <p className=" mt-10 text-xs px-2">
            Click on finsih ride if you have complete the payment
          </p>
        </div>
      </div>
    </div>
  );
};
