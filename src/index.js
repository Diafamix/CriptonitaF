import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
import Portfolio from "./components/portfolio/Portfolio";
import LogOut from "./components/registration/LogOut";
import Swap from "./components/swap/Swap";
import GuardedRoute from "./components/utils/GuardedRoute";
import NeedsRegistration from "./components/utils/NeedsRegistration";
import CoinInfo from "./components/coinInfo/CoinInfo";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Home" element={<Home />}></Route>
      <Route path="/coinInfo/:coin" element={<CoinInfo />} />
      <Route
        path="/Login"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Login />{" "}
          </GuardedRoute>
        }
      />
      <Route
        path="/Register"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Register />{" "}
          </GuardedRoute>
        }
      />
      <Route
        path="/Portfolio"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Portfolio />{" "}
          </GuardedRoute>
        }
      />
      <Route
        path="/Swap"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Swap />{" "}
          </GuardedRoute>
        }
      />
      <Route path="/LogOut" element={<LogOut />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
