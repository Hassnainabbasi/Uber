import React from 'react'
import images from '../constant/image';

export const WaitforDriver = ({ waitingDriver, ride }) => {
  return (
    <div>
      <h5
        onClick={() => waitingDriver(false)}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <div className="flex items-center justify-between">
        <img className="h-12" src={images.car} alt="" />
        <div className="text-right">
          <h2 className="font-medium text-lg capitalize">
            {ride?.captain?.fullName?.firstName +
              " " +
              ride?.captain?.fullName?.lastName}
          </h2>
          <h4 className="text-xl font-semibold -mb-1 -mt-2">
            {ride?.captain?.vechile?.plate}
          </h4>
          <p className="text-lg font-bold text-gray-900">
            {ride?.captain?.vechile?.vechileType}
          </p>
          <p className="text-base font-bold text-gray-900">
           Otp: {ride?.otp}
          </p>
        </div>
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
      </div>
    </div>
  );
}
