import React, { useState } from 'react';
import '../Overtime/OvertimeManagement.scss';
import AddDeduction from '../../components/Deduction/Adddeduction';
import AddAdvanceRecord from '../../components/Advance/AddAdvanceRecord';
import AdvanceTable from '../../components/Advance/Advancelist';
import AddAdvance from '../../components/Deduction/Adddeduction';
import DeductionTable from '../../components/Deduction/Deductionlist';


const OvertimeManagement = () => {
  const [showDeductionForm, setShowDeductionForm] = useState(false); 
  const [showAdvanceForm, setShowAdvanceForm] = useState(false); 

  const handleToggleDeductionForm = () => {
    setShowDeductionForm(!showDeductionForm);
    setShowAdvanceForm(false); 
  };

  const handleToggleAdvanceForm = () => {
    setShowAdvanceForm(!showAdvanceForm);
    setShowDeductionForm(false); 
  };



  return (
    <div className="overtime-management-container">
      <div className="heading">
        <button onClick={handleToggleDeductionForm}>Add Deduction</button>
        <DeductionTable/>

        <button onClick={handleToggleAdvanceForm}>Add Advance</button>
      </div>
      {showDeductionForm && <AddDeduction />}
      <AdvanceTable/>
      {showAdvanceForm && <AddAdvanceRecord />}
    </div>
  );
};

export default OvertimeManagement;
