import React, { useRef, useState } from "react";
import images from "../constant/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { LocationPannel } from "../components/LocationPannel";
import { VechilePannel } from "../components/VechilePannel";
import { ConfirmVechile } from "../components/ConfirmVechile";
import { LookingforDriver } from "../components/LookingforDriver";
import { WaitforDriver } from "../components/WaitforDriver";

export const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [driverPannel, setDriverPannel] = useState(false);
  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null);  
  const vechilePannelRef = useRef(null)
  const driverPannelRef = useRef(null);
  const vechileFoundRef = useRef(null);
  const confirmPannelRef = useRef(null);
  const [vechile, setVechile] = useState(false);
  const [confirmVechile, setConfirmVechile] = useState(false);
  const [vechileFound, setVechileFound] = useState(false);


  console.log("VechilePannel rendered", vechileFound);

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

  useGSAP(()=>{
   if (vechile) {
    gsap.to(vechilePannelRef.current, {
      transform: "translateY(0)",
    });
   }
   else{
    gsap.to(vechilePannelRef.current, {
      transform: "translateY(100%)",
    });
   }
  },[vechile])

  useGSAP(() => {
    if (confirmVechile) {
      gsap.to(confirmPannelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmPannelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmVechile]);

  useGSAP(() => {
    if (vechileFound) {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vechileFound]);

  useGSAP(() => {
    if (driverPannel) {
      gsap.to(driverPannelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(driverPannelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [driverPannel]);


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
      <div className="flex flex-col justify-end absolute h-[106%] top-0 w-screen">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={pannelCloseRef}
            onClick={() => setPannelOpen(false)}
            className="absolute  top-6 right-6 opacity-0 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
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
          <LocationPannel
            vechilePannel={vechile}
            setVechilePannel={setVechile}
            setPannelOpen={setPannelOpen}
            pannelOpen={pannelOpen}
          />
        </div>
      </div>
      <div
        ref={vechilePannelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <VechilePannel
          setConfirmVechile={setConfirmVechile}
          setVechile={setVechile}
        />
      </div>
      <div
        ref={confirmPannelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-14"
      >
        <ConfirmVechile
          setConfirmVechile={setConfirmVechile}
          setVechile={setVechile}
          setVechileFound={setVechileFound}
        />
      </div>
      <div
        ref={vechileFoundRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-14"
      >
        <LookingforDriver setVechilFound={setVechileFound} />
      </div>
      <div
       ref={driverPannelRef}
        className="fixed w-full z-10  bottom-0 bg-white px-3 py-6 pt-14"
      >
        <WaitforDriver waitingDriver={setDriverPannel} setVechilFound={setVechileFound} />
      </div>
    </div>
  );
};
