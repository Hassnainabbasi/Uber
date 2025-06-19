import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import images from "../constant/image";
import { CaptainDetail } from "../components/CaptainDetail";
import { RidePopup } from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ConfirmRidePopPannel } from "../components/ConfirmRidePopPannel";

export const CaptainHome = () => {
  const [ridePopPannel, setRidePopPannel] = useState(true);
  const [confirmRidePopPannel, setConfirmRidePopPannel] = useState(false);

  console.log("RidePopPannel rendered", ridePopPannel);
  console.log("ConfirmRidePopPannel rendered", confirmRidePopPannel);
  const ridePopPannelRef = useRef(null);
  const confirmRidePopPannelRef = useRef(null);
  
  useGSAP(() => {
    if (confirmRidePopPannel) {
      gsap.to(confirmRidePopPannelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopPannelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopPannel]);
  
  useGSAP(() => {
    if (ridePopPannel) {
      gsap.to(ridePopPannelRef.current, {
       transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopPannelRef.current, {
       transform: "translateY(100%)",
      });
    }
  }, [ridePopPannel]);

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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src={images.mapsImg}
          alt=""
        />
      </div>
      {/* <div className="h-1/2 p-4 ">
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
      </div> */}
      <div className="h-2/5 p-6">
        <CaptainDetail />
      </div>
      <div
        ref={ridePopPannelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 "
      >
        <RidePopup setRidePopPannel={setRidePopPannel} setConfirmRidePopPannel={setConfirmRidePopPannel}/>
      </div>
      <div
        ref={confirmRidePopPannelRef}
        className="fixed w-full z-10 h-screen translate-y-full bottom-0 bg-white px-3 py-6 "
      >
        <ConfirmRidePopPannel setConfirmRidePopPannel={setConfirmRidePopPannel} />
      </div>
    </div>
  );
};
