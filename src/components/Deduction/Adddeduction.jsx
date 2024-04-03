import React, { useState } from 'react';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import { useAddDeductionMutation } from './DeductionApi';
import Modal from '../modal/modal';
import { useGetEmployeesQuery } from '../../features/Employeemanagement/employeeApi';

const AddAdvance = () => {
    const [addDeduction, { isLoading }] = useAddDeductionMutation(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeID,setEmployeeID]=useState("");
    const{data:employeeData}=useGetEmployeesQuery()

    const handleSubmit = async (e) => {
        LoadingToast();
        e.preventDefault();
        const Description = e.target.Description.value;
        const Amount = e.target.Amount.value;
        try {
            const response = await addDeduction({
            
              Description,
              Amount: parseFloat(Amount),
              EmployeeID:employeeID
                
            }).unwrap(); 

            console.log('response', response);
            LoadingToast(false);
            SuccessToast(response.message);
            e.target.reset();
            setIsModalOpen(false);
        } catch (err) {
            console.error('An error occurred:', err);
            ErrorToast('deduction exists');
            LoadingToast(false);
            setIsModalOpen(false)
        }
    };

    return (
        <>
   <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>        <div>
            <div className="form-container1">
                <form className='eventWrap' onSubmit={handleSubmit}>
                    <div className="btn"></div>
                    <div className="textarea">
                        <input
                            type="text"
                            placeholder="Description"
                            name="Description"
                            id='Description'
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
                {employeeData && employeeData.map(employee => (
                  <option key={employee.ID} value={employee.ID}>
                    {employee.Firstname|| '-'} {employee.Lastname} {employee.ID}
                  </option>
                ))}
              </select>
                        <div className="footer">
                            <div className="btn">
                                <button type="submit" disabled={isLoading}>Add Deduction</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            </Modal>
           </>
    );
};

export default AddAdvance;
