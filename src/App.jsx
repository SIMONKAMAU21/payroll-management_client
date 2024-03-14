import React from "react";
import Login from "./pages/Login/login";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maincontent from "./layouts/MainContent/Maincontent";
import EmployeeDashbord from "./layouts/Employeedashbord/EmployeeDashbord";

const App = () => {
  return (
    <div className="route">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="*" element ={<EmployeeDashbord/>}/> */}
          <Route path="*" element={<Maincontent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
