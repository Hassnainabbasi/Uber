import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserLogin } from "./pages/UserLogin";
import { UserSignup } from "./pages/UserSignup";
import { CaptainLogin } from "./pages/CaptainLogin";
import { CaptainSignup } from "./pages/CaptainSignup";
import { UserContext, UserDataContext } from "./context/userContext";
import { useContext } from "react";
import { Start } from "./pages/Start";
import { Home } from "./pages/Home";
import { UserProtectWrapper } from "./pages/UserProtectWrapper";
import { UserLogout } from "./pages/UserLogout";

function App() {
  const ans = useContext(UserDataContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </>
  );
}

export default App;
