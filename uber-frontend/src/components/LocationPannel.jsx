import React from "react";

export const LocationPannel = ({
  vechilePannel,
  setVechilePannel,
  pannelOpen,
  setPannelOpen,
  suggestions = [],
  onSuggestionClick,
}) => {
  return (
    <div>
      {suggestions.length === 0 && (
        <div className="text-gray-400 text-center py-4">No suggestions</div>
      )}
      {suggestions.map((location, index) => (
        <div
          onClick={() => {
            // setVechilePannel(true);
            // setPannelOpen(false);
            onSuggestionClick(location.description); 
          }}
          key={index}
          className="items-center gap-2 border-2 rounded-xl border-gray-100 active:border-black p-3 flex my-4 cursor-pointer"
        >
          <h2 className="bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location.description}</h4>{" "}
        </div>
      ))}
    </div>
  );
};
