import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Box from "./components/Box";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Rank from "./components/Rank";
import { app } from "./fb";

const App = () => {
  console.log("app", app);
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
      <Home />
    </div>
  );
};

export default App;
