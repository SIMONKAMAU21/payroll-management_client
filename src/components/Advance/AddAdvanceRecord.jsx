import React, { useState } from 'react';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import { useAddAdvanceMutation } from './AdvanceApi';
import '../Advance/AddAdvanceRecord.scss';
import Modal from '../modal/Modal';

const AddAdvance = () => {
  const [addAdvance, { isLoading }] = useAddAdvanceMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.Date.value;
    const amount = e.target.Amount.value;
    const employeeID = e.target.EmployeeID.value;

    try {
      LoadingToast();
      const response = await addAdvance({ Date: date, Amount: amount, EmployeeID: employeeID }).unwrap();
      console.log('response', response);
      SuccessToast(response.message);
      setIsModalOpen(false);
      e.target.reset();
    } catch (err) {
      console.error('An error occurred:', err);
      ErrorToast('An error occurred. Please try again later.');
    } finally {
      LoadingToast(false);
    }
  };

  return (
    <>
      <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="form-container1">
          <form className='eventWrap' onSubmit={handleSubmit}>
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
      </Modal>
    </>
  );
};

export default AddAdvance;
