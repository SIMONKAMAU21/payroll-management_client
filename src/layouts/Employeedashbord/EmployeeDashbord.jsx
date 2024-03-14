import React from "react";
import Header from "../Header/Header";
import "../Employeedashbord/EmployeeDashbord.scss";
import EmployeeBord from "../../pages/Employee/Employeebord";

const EmployeeDashbord = () => {
  return (
    <div className="dashholder">
      <Header />
      <div className="dashbord">
        <EmployeeBord />
      </div>
    </div>
  );
};

export default EmployeeDashbord;
