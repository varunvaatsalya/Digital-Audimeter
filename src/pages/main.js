import React from "react";
import Sidebar from "../components/sidebar";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../section/Home";
import Instruction from "../section/Instruction";
import Consultation from "../section/Consultation";
import Support from "../section/Support";

function Main() {
  return (
    <>
      <BrowserRouter>
        <div className="main flex">
          <div className="sidebar-section">
            <Sidebar />
          </div>
          <div className="section">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/instruction" Component={Instruction} />
              <Route path="/consultation" Component={Consultation} />
              <Route path="/support" Component={Support} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Main;
