import React, { useState } from 'react';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import { useAddAdvanceMutation } from './AdvanceApi';
import '../Advance/AddAdvanceRecord.scss';

const AddAdvance = () => {

    const [addAdvance, { isLoading }] = useAddAdvanceMutation();

    const handleSubmit = async (e) => {
      LoadingToast();
      e.preventDefault();
      const Date=e.target.Date.value;
      const Amount=e.target.Amount.value;
      const EmployeeID=e.target.EmployeeID.value;
  
      try {
          const response = await addAdvance({Date:Date,Amount:Amount,EmployeeID:EmployeeID}).unwrap();
          console.log('response', response)
          LoadingToast(false)
          SuccessToast(response.message);
           e.target.reset();
          }  
       catch (err) {
          console.error('An error occurred:', err);
          ErrorToast('An error occurred. Please try again later.');
          LoadingToast(false)
      }
  }
  


    return (
        <div>
            <div className="form-container">
                <form className='eventWrap' onSubmit={handleSubmit}>
                    <div className="btn">
                    </div>
                    <div className="textarea">
                        <input
                            type="date"
                            placeholder="Date"
                            name="Date"
                            id='Date'
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            name="Amount"
                            id='Amount'
                        />
                        <input
                            type="text"
                            placeholder="Employee ID"
                            name="EmployeeID"
                            id='EmployeeID'
                        />
                        <div className="footer">
                            <div className="btn">
                                <button type="submit" disabled={isLoading}>Add Advance</button>
                           
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAdvance;
