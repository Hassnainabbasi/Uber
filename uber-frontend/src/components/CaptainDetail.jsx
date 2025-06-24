import React, { useContext } from "react";
import images from "../constant/image";
import { CaptainDataContext } from "../context/captainContext";

export const CaptainDetail = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={images.driver}
            alt=""
          />
          <h4 className="font-medium text-lg capitalize">
            {captain.fullName.firstName + " " + captain.fullName.lastName}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs400.19</h4>
          <p className="text-sm">Earned</p>
        </div>
      </div>
      <div className="flex p-3 bg-gray-100 rounded-xl justify-center items-start gap-5 mt-5">
        <div className="text-center">
          <i className="text-2xl font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-gray-600 text-sm">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-gray-600 text-sm">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-gray-600 text-sm">Hours Online</p>
        </div>
      </div>
    </>
  );
};
