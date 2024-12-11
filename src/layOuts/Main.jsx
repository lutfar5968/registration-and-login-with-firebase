import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


function Main() {
  return (
    <>
     <Header/>
      <Outlet/>
    </>
  );
}

export default Main;
