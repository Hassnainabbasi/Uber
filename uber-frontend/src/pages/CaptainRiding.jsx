import React, { useRef, useState } from "react";
import images from "../constant/image";
import { Link, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FinishRide } from "../components/FinishRide";

export const CaptainRiding = () => {
  const [finishRidePopPannel, setfinishRidePopPannel] = useState(false);
  const finishRidePopPannelRef = useRef(null);
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(() => {
    if (finishRidePopPannel) {
      gsap.to(finishRidePopPannelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePopPannelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePopPannel]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        <img className="w-16" src={images.logo} alt="" />
        <Link
          to={"/captain-home"}
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src={images.mapsImg}
          alt=""
        />
      </div>
      <div
        className="h-1/5 bg-yellow-400 p-6 flex relative
       items-center justify-between"
      >
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="ri-arrow-up-wide-line text-3xl text-gray-800"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button onClick={()=> setfinishRidePopPannel(true)} className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Rides
        </button>
      </div>
      <div
        ref={finishRidePopPannelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 "
      >
        <FinishRide rideData={rideData} setFinishRide={setfinishRidePopPannel} />
      </div>
    </div>
  );
};
