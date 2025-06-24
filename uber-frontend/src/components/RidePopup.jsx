import React from "react";
import images from "../constant/image";

export const RidePopup = ({
  setRidePopPannel,
  setConfirmRidePopPannel,
  ride,
  confirmRide
}) => {
  return (
    <>
      <div>
        <h5
          onClick={() => setRidePopPannel(false)}
          className="p-1 text-center w-[93%] absolute top-0"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
        </h5>
        <h3 className="text-xl font-semibold mb-5">New Ride Available!</h3>
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
                <h3 className="text-lg font-medium">{ride?.fare}</h3>
                <h3 className="text-gray-600 text-sm -mt-1">Cash Cash</h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-3 mt-5">
            <button
              onClick={() => {
                setConfirmRidePopPannel(true);
                setRidePopPannel(false);
                confirmRide()
              }}
              className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={() => setRidePopPannel(false)}
              className="w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
