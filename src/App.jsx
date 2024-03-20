import React from "react";
import Login from "./pages/Login/login";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maincontent from "./layouts/MainContent/Maincontent";
import EmployeeDashbord from "./layouts/Employeedashbord/EmployeeDashbord";
import { ToasterContainer } from "./components/toaster/Toaster";

const App = () => {
  return (
    <div className="route">
      <BrowserRouter>
          <ToasterContainer/>
        <Routes>
          <Route path="/" element={<Login /> } exact />
          <Route path="*" element={<Maincontent/>} />
          <Route path="/employee" element ={<EmployeeDashbord/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
