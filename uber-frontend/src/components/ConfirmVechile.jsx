import React from "react";
import images from "../constant/image";

export const ConfirmVechile = ({ setConfirmVechile, setVechile, setVechileFound }) => {
  return (
    <>
      <div>
        <h5
          className="p-1 text-center w-[93%] absolute top-0"
          onClick={() => {
            setVechile(false);
            setConfirmVechile(false);
          }}
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
        <div className="flex justify-between items-center flex-col">
          <img className="h-20" src={images.car} alt="" />
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b">
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <h3 className="text-gray-600 text-sm -mt-1">
                  Qalandari Biryan, North Karachi
                </h3>
              </div>
            </div>
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
          <button onClick={()=> {
            setVechileFound(true);
            setConfirmVechile(false);
          }} className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};
