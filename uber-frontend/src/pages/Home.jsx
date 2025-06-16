import React, { useRef, useState } from "react";
import images from "../constant/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { LocationPannel } from "../components/LocationPannel";

export const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: "70%",
        opacity: 1,
        padding: 20,
      });
      gsap.to(pannelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(pannelRef.current, {
        height: "0%",
        opacity: 0,
        padding: 20,
      });
      gsap.to(pannelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [pannelOpen]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-20 absolute left-5 top-5" src={images.logo} alt="" />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src={images.mapsImg}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end absolute h-full top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={pannelCloseRef}
            onClick={() => setPannelOpen(false)}
            className="absolute  top-6 right-6 opacity-0 text-2xl"
          >
            <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[41%] left-10 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onClick={() => setPannelOpen(true)}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              name=""
              placeholder="Add a pick-up locataion"
            />
            <input
              value={destination}
              onClick={() => setPannelOpen(true)}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              name=""
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={pannelRef} className="h-[0%] bg-white p-5">
          <LocationPannel />
        </div>
      </div>
      <div className="fixed w-full z-10 bottom-0 bg-white px-3 py-6">
        <h3 className="text-xl font-semibold mb-5">Choose a Vechile</h3>
        <div className="flex bg-gray-100 mb-2 active:border-2 active:border-black rounded-xl w-full p-3 items-center justify-between">
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
        <div className="flex bg-gray-100 active:border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between">
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
        <div className="flex bg-gray-100 active:border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between">
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
        <div className="flex bg-gray-100 active:border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between">
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
    </div>
  );
};
