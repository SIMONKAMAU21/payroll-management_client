import React, { useState } from 'react';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import { useAddAdvanceMutation } from './AdvanceApi';
import '../Advance/AddAdvanceRecord.scss';
import Modal from '../modal/modal';
import { useGetEmployeesQuery } from '../../features/Employeemanagement/employeeApi';
import { useEffect } from 'react';

const AddAdvance = () => {
  const [addAdvance, { isLoading }] = useAddAdvanceMutation();
  const [employeeID, setEmployeeID] = useState('');
  const { data: employeeData } = useGetEmployeesQuery();
  const [employeeList, setEmployeeList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log('employeeData', employeeData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.Date.value;
    const amount = e.target.Amount.value;

    useEffect(() => {
      if (employeeData) {
        setEmployeeList(employeeData)
      }
    }, []);

    try {
      LoadingToast();
      const response = await addAdvance({ Date: date, Amount: amount, EmployeeID: employeeID }).unwrap();
      console.log('response', response);
      SuccessToast(response.message);
      setIsModalOpen(false);
      e.target.reset();
    } catch (err) {
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
              <select
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}>
                <option value="">
                  select Employee
                </option>
                {employeeList.map(employee => (
                  <option key={employee.ID} value={employee.ID}>
                    {employee.Firstname}
                  </option>
                ))}
              </select>
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
