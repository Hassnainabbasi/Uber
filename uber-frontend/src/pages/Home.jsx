import React from "react";
import images from "../constant/image";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5310f182519763.652f3606b64b0.jpg)] h-screen pt-8 flex flex-col justify-between w-full">
        <img className="w-14 ml-8" src={images.logo} />
        <div className="bg-white py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to={'/login'}>
            <button className="w-full bg-black text-white rounded mt-2 py-4">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
