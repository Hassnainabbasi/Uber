import React, { useContext, useEffect } from "react";
import images from "../constant/image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { UserDataContext } from "../context/userContext";
import { LiveTracking } from "../components/LiveTracking";

export const Riding = () => {
  const location = useLocation();
  const ride = location?.state?.ride;
  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate()

  console.log(ride, "data");

  useEffect(() => {

    if (!user || !socket) {
      return;
    }
    
    const handleRideEnded = (ride) => {
      console.log(ride, "Ride completed event received!");
      navigate("/home");
    };

    socket.on("ride-end", handleRideEnded);

    return () => {
      socket.off("ride-end", handleRideEnded);
    }
  }, [user, socket]);
  return (
    <div className="h-screen">
      <Link
        to={"/home"}
        className="fixed h-10 w-10 bg-white flex right-2 top-2    items-center justify-center rounded-full"
      >
        <i className="ri-home-4-line text-lg font-medium"></i>
      </Link>
      <div className="h-1/2">
       <LiveTracking />
      </div>
      <div className="h-1/2 p-4 ">
        <div className="flex items-center justify-between">
          <img className="h-12" src={images.car} alt="" />
          <div className="text-right">
            <h2 className="font-medium text-lg">
              {" "}
              {ride?.user?.fullName?.firstName +
                " " +
                ride?.user?.fullName?.lastName}
            </h2>
            <h4 className="text-xl font-semibold -mb-1 -mt-2">
              {ride?.captain?.vechile?.plate}
            </h4>
            <p className="text-sm text-gray-600">Honda Civic</p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-col">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">B-17/3</h3>
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
        <button className="w-full bg-green-600 text-white font-semibold p-2 mt-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};
