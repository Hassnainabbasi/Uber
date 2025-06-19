import React from "react";
import images from "../constant/image";
import { Link } from "react-router-dom";

export const Riding = () => {
  return (
    <div className="h-screen">
      <Link to={'/home'} className="fixed h-10 w-10 bg-white flex right-2 top-2    items-center justify-center rounded-full">
        <i className="ri-home-4-line text-lg font-medium"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src={images.mapsImg}
          alt=""
        />
      </div>
      <div className="h-1/2 p-4 ">
        <div className="flex items-center justify-between">
          <img className="h-12" src={images.car} alt="" />
          <div className="text-right">
            <h2 className="font-medium text-lg">Hassnain</h2>
            <h4 className="text-xl font-semibold -mb-1 -mt-2">MP04 AB1234</h4>
            <p className="text-sm text-gray-600">Honda Civic</p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-col">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">B-17/3</h3>
                <h3 className="text-gray-600 text-sm -mt-1">
                  Opp. Madni Bakery, Nazimabad No. 3
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">Rs 250</h3>
                <h3 className="text-gray-600 text-sm -mt-1">Cash Cash</h3>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-2 mt-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};
