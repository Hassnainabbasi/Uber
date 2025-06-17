import React from "react";

export const LocationPannel = ({
  vechilePannel,
  setVechilePannel,
  pannelOpen,
  setPannelOpen,
}) => {
  const locations = [
    "F292, Near Rado Bakery, Bag-e-Korangi, Karachi",
    "F242, Near Gohar Bakery, Bag-e-Korangi, Karachi",
    "F262, Near Norani Hotel, Bag-e-Korangi, Karachi",
    "F292, Near Rado Bakery, Bag-e-Korangi, Karachi",
    "F242, Near Gohar Bakery, Bag-e-Korangi, Karachi",
    "F262, Near Norani Hotel, Bag-e-Korangi, Karachi",
    "F222, Near Rado Bakery, Bag-e-Korangi, Karachi",
    "F292, Near Rado Bakery, Bag-e-Korangi, Karachi",
    "F292, Near Rado Bakery, Bag-e-Korangi, Karachi",
  ];
  return (
    <div>
      {locations.map((location, index) => (
        <div
          onClick={() =>{
            setVechilePannel(true);
            setPannelOpen(false);
          }
          }
          key={index}
          className="items-center gap-2 border-2 rounded-xl border-gray-100 active:border-black p-3 flex my-4 justify-center"
        >
          <h2 className="bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};
