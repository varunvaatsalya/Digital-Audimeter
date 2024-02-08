import React, { useState } from "react";
import * as BiIcon from "react-icons/bi";
import * as ImIcon from "react-icons/im";
import * as FaIcon from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [active, setActive] = useState(1);
  function showSidebar(n){
    setActive(n);
  }

  return (
    <div>
      <div className="sidebar">
        <div className="icon" onClick={()=>showSidebar(1)}>
          <Link to="/home" className={active===1 ? "icon-link active" : "icon-link noactive"}>
            <div className="iconimg">
              <BiIcon.BiSolidDashboard size={49} className="reactIcons" />
            </div>
            <p>Home</p>
          </Link>
        </div>
        <div className="icon" onClick={()=>showSidebar(2)}>
          <Link to="/instruction" className={active===2 ? "icon-link active" : "icon-link noactive"}>
            <div className="iconimg">
              <ImIcon.ImFileText2 size={45} className="reactIcons" />
            </div>
            <p>Instruction</p>
          </Link>
        </div>
        <div className="icon" onClick={()=>showSidebar(3)}>
          <Link to="/consultation" className={active===3 ? "icon-link active" : "icon-link noactive"}>
            <div className="iconimg">
              <FaIcon.FaUserDoctor size={45} className="reactIcons" />
            </div>
            <p>Consultation</p>
          </Link>
        </div>
        <div className="icon" onClick={()=>showSidebar(4)}>
          <Link to="/support" className={active===4 ? "icon-link active" : "icon-link noactive"}>
            <div className="iconimg">
              <BiIcon.BiSupport size={45} className="reactIcons" />
            </div>
            <p>Support</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
