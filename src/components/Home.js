import React from "react";
import Navbar from "./Navbar";
import Skill from "./coinList/CoinList";
import Banner from "./Banner";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Skill></Skill>
    </>
  );
}

export default Home;
