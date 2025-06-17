import React from 'react'
import images from '../constant/image';

export const VechilePannel = ({ setVechile, setConfirmVechile }) => {
  return (
    <>
      <div>
        <h5
          onClick={() => setVechile(false)}
          className="p-3 text-center absolute top-0 w-[93%]"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
        </h5>
        <h3 className="text-xl font-semibold mb-5">Choose a Vechile</h3>
        <div
          onClick={() => {
            setConfirmVechile(true)
            setVechile(false)
          }}
          className="flex bg-gray-100 mb-2 active:border-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
        >
          <img className="h-12" src={images.car} alt="" />
          <div className="w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill">4</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Car Rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">Rs300</h2>
        </div>
        <div
          onClick={() => {
            setConfirmVechile(true)
            setVechile(false)
          }}
          className="flex bg-gray-100 active:border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
        >
          <img className="h-12" src={images.motorbike} alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill">1</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Motorcycle Rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">Rs150</h2>
        </div>
        <div
          onClick={() => {
            setConfirmVechile(true)
            setVechile(false)
          }}
          className="flex bg-gray-100 active:border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
        >
          <img className="h-12" src={images.auto} alt="" />
          <div className="w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill">4</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Rickshaw Rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">Rs200</h2>
        </div>
        <div
          onClick={() => {
            setConfirmVechile(true)
            setVechile(false)
          }}
          className="flex bg-gray-100 active:border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
        >
          <img className="h-12" src={images.blackCar} alt="" />
          <div className="w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill">4</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Mercedies Rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">Rs500</h2>
        </div>
      </div>
    </>
  );
}
