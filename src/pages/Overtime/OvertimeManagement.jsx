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
    setShowDeductionForm(!showDeductionForm);
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
        <button onClick={handleToggleDeductionForm}>Add Deduction</button>
      </div>
      {showDeductionForm && <AddDeduction />}
      <DeductionTable/>
</div>

    <div className="advance">
<div className="heading1">
<button onClick={handleToggleAdvanceForm}>Add Advance</button>
</div>
      {showAdvanceForm && <AddAdvanceRecord />}
      <AdvanceTable/>
    </div>
    </div>
  );
};

export default OvertimeManagement;
