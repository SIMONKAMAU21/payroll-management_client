import React, { useState } from 'react';
import '../Overtime/OvertimeManagement.scss';
import AddDeduction from '../../components/Deduction/Adddeduction';
import AddAdvanceRecord from '../../components/Advance/AddAdvanceRecord';
import AdvanceTable from '../../components/Advance/Advancelist';
import DeductionTable from '../../components/Deduction/Deductionlist';


const OvertimeManagement = () => {
  const [showDeductionForm, setShowDeductionForm] = useState(false); 
  const [showAdvanceForm, setShowAdvanceForm] = useState(false); 

  const handleToggleDeductionForm = () => {
    setShowDeductionForm(true);
    setShowAdvanceForm(false); 
  };

  const handleToggleAdvanceForm = () => {
    setShowAdvanceForm(!showAdvanceForm);
    setShowDeductionForm(false); 
  };



  return (
    <div className="overtime-management-container">
<div className="deduction">
<div className="heading1">
        <button onClick={handleToggleDeductionForm}>click to add deduction</button>
      </div>
      {showDeductionForm && <AddDeduction />}
      <DeductionTable/>
</div>

    <div className="advance">
<div className="heading1">
<button onClick={handleToggleAdvanceForm}>click to add Advance</button>
</div>
      {showAdvanceForm && <AddAdvanceRecord />}
      <AdvanceTable/>
    </div>
    </div>
  );
};

export default OvertimeManagement;
