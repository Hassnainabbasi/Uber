import React, { useContext, useEffect, useRef, useState } from "react";
import images from "../constant/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { LocationPannel } from "../components/LocationPannel";
import { VechilePannel } from "../components/VechilePannel";
import { ConfirmVechile } from "../components/ConfirmVechile";
import { LookingforDriver } from "../components/LookingforDriver";
import { WaitforDriver } from "../components/WaitforDriver";
import axios from "axios";
import { SocketContext } from "../context/socketContext";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [driverPannel, setDriverPannel] = useState(false);
  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null);
  const vechilePannelRef = useRef(null);
  const driverPannelRef = useRef(null);
  const vechileFoundRef = useRef(null);
  const confirmPannelRef = useRef(null);
  const [vechile, setVechile] = useState(false);
  const [confirmVechile, setConfirmVechile] = useState(false);
  const [vechileFound, setVechileFound] = useState(false);
  const [ride, setRide] = useState(null);
  const [fare, setFare] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [vechileType, setVechileType] = useState("");
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);

  useEffect(() => {
    console.log("👀 useEffect called", { user, socket });

    if (!user || !socket) {
      console.log("❌ useEffect exit: user or socket missing");
      return;
    }

    console.log("✅ useEffect passed check");

    sendMessage("join", { userType: "user", userId: user._id });

    const handleRideConfirmed = (ride) => {
      console.log("🎉 Ride confirmed event received!", ride);
      setRide(ride);
      setVechileFound(false);
      setDriverPannel(true);
    };

    const handleRideStart = (ride) => {
      console.log(ride, "Ride start event received!");
      setDriverPannel(false);
      navigate("/riding", { state: { ride } });
    };

    const handleRideEnd = (ride) => {
      console.log(ride, "Ride completed event received!");
      navigate("/home");
    };

    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-start", handleRideStart);
    socket.on("ride-end", handleRideEnd);

    return () => {
      socket.off("ride-end", handleRideEnd);
      socket.off("ride-start", handleRideStart);
      socket.off("ride-confirmed", handleRideConfirmed);
    };
  }, [user, socket]);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:4000/maps/get-suggestions",
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      setSuggestions(res.data || []);
    } catch (err) {
      setSuggestions([]);
    }
  };

  const findTrip = async (e) => {
    setVechile(true);
    setPannelOpen(false);
    const res = await axios.get(`http://localhost:4000/rides/get-fare`, {
      params: {
        pickup,
        destination,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Fare response:", res.data);
    setFare(res.data);
  };

  const createRide = async () => {
    const res = await axios.post(
      `http://localhost:4000/rides/create`,
      {
        pickup,
        destination,
        vehicleType: vechileType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("Ride created:", res.data);
  };

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    setActiveField("pickup");
    fetchSuggestions(e.target.value);
    setPannelOpen(true);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setActiveField("destination");
    fetchSuggestions(e.target.value);
    setPannelOpen(true);
  };

  const handleSuggestionClick = (location) => {
    if (activeField === "pickup") {
      setPickup(location);
    } else if (activeField === "destination") {
      setDestination(location);
    }
    setPannelOpen(false);
    setSuggestions([]);
  };

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
        padding: 0,
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

  useGSAP(() => {
    if (vechile) {
      gsap.to(vechilePannelRef.current, {
        transform: "translateY(0)",
        padding: 20,
      });
    } else {
      gsap.to(vechilePannelRef.current, {
        transform: "translateY(100%)",
        padding: 0,
      });
    }
  }, [vechile]);

  useGSAP(() => {
    if (confirmVechile) {
      gsap.to(confirmPannelRef.current, {
        transform: "translateY(0)",
        padding: 20,
      });
    } else {
      gsap.to(confirmPannelRef.current, {
        transform: "translateY(100%)",
        padding: 0,
      });
    }
  }, [confirmVechile]);

  useGSAP(() => {
    if (vechileFound) {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(0)",
        padding: 20,
      });
    } else {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(100%)",
        padding: 0,
      });
    }
  }, [vechileFound]);

  useGSAP(() => {
    if (driverPannel) {
      gsap.to(driverPannelRef.current, {
        transform: "translateY(0)",
        padding: 20,
      });
    } else {
      gsap.to(driverPannelRef.current, {
        transform: "translateY(100%)",
        padding: 0,
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
        <div className="h-[30%] px-6 py-3 bg-white relative">
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
            <div className="line absolute h-16 w-1 top-[36%] left-10 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onClick={() => {
                setPannelOpen(true);
                setActiveField("pickup");
                fetchSuggestions(pickup);
              }}
              onChange={handlePickupChange}
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              name=""
              placeholder="Add a pick-up locataion"
            />
            <input
              value={destination}
              onClick={() => {
                setPannelOpen(true);
                setActiveField("destination");
                fetchSuggestions(destination);
              }}
              onChange={handleDestinationChange}
              className="bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              name=""
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white p-2 rounded-lg border-none mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={pannelRef} className="h-[0%] bg-white p-5">
          <LocationPannel
            vechilePannel={vechile}
            setVechilePannel={setVechile}
            setPannelOpen={setPannelOpen}
            pannelOpen={pannelOpen}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>
      <div
        ref={vechilePannelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <VechilePannel
          setVechileType={setVechileType}
          setVechile={setVechile}
          setConfirmVechile={setConfirmVechile}
          fare={fare}
        />
      </div>
      <div
        ref={confirmPannelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-14"
      >
        <ConfirmVechile
          createRide={createRide}
          setConfirmVechile={setConfirmVechile}
          setVechile={setVechile}
          pickup={pickup}
          fare={fare}
          vechileType={vechileType}
          destination={destination}
          setVechileFound={setVechileFound}
        />
      </div>
      <div
        ref={vechileFoundRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-14"
      >
        <LookingforDriver
          pickup={pickup}
          destination={destination}
          setVechilFound={setVechileFound}
          vechileType={vechileType}
          fare={fare}
        />
      </div>
      <div
        ref={driverPannelRef}
        className="fixed w-full z-10  bottom-0 bg-white px-3 py-6 pt-14"
      >
        <WaitforDriver
          waitingDriver={setDriverPannel}
          setVechilFound={setVechileFound}
          ride={ride}
        />
      </div>
    </div>
  );
};
