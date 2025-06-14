import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import images from '../constant/image';

export const CaptainLogin = () => {
     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [captainData, setCaptainData] = useState({});
    
      const handleSumbit = (e) => {
        e.preventDefault();
        const data = {
          email: email,
          password: password,
        };
        setCaptainData(data);
        console.log("console.log", captainData);
    
        setEmail("");
        setPassword("");
      };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-10" src={images.logo} />
        <form onSubmit={handleSumbit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="email"
            name=""
            placeholder="email@example.com"
            id=""
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="password"
            name=""
            placeholder="password"
            id=""
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center">
            Join a fleet?
            <Link to={"/captain-signup"} className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/login"}>
          <button className="bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Sign in as User
          </button>
        </Link>
      </div>
    </div>
  );
}
