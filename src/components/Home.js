import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Banner/Carousel";
import Skill from "./coinList/CoinList";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <Skill></Skill>
      <Footer></Footer>
    </>
  );
}

export default Home;
