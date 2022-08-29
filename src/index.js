import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/registration/Login";
import RegisterPage from "./pages/RegisterPage";
import Portfolio from "./components/portfolio/Portfolio";
import LogOut from "./components/registration/LogOut";
import Swap from "./components/swap/Swap";
import GuardedRoute from "./components/utils/GuardedRoute";
import NeedsRegistration from "./components/utils/NeedsRegistration";
import CoinInfo from "./components/coinInfo/CoinInfo";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";
import CustomersPage from "./pages/CustomersPage";
import Retrieve from "./components/registration/Retrieve"
import Send from "./components/swap/Send"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Home" element={<Home />}></Route>
      <Route path="/coinInfo/:coin" element={<CoinInfo />} />
      <Route path="/Portfolio" element={<Portfolio></Portfolio>} />
      <Route
        path="/Swap"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Swap />{" "}
          </GuardedRoute>
        }
      />

      <Route
        path="/Send"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Send />{" "}
          </GuardedRoute>
        }
      />

      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/Retrieve" element={<Retrieve/>}></Route>
      <Route path="/History" element={<CustomersPage />}></Route>
      <Route path="/LogOut" element={<LogOut />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
