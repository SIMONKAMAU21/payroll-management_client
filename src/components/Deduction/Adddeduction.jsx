import React, { useState } from 'react';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import { useAddDeductionMutation } from './DeductionApi';
import Modal from '../modal/Modal';

const AddAdvance = () => {
    const [addDeduction, { isLoading }] = useAddDeductionMutation(); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        LoadingToast();
        e.preventDefault();
        const Description = e.target.Description.value;
        const Amount = e.target.Amount.value;
        const EmployeeID = e.target.EmployeeID.value;

        try {
            const response = await addDeduction({
            
              Description,
              Amount: parseFloat(Amount),
              EmployeeID
                
            }).unwrap(); 

            console.log('response', response);
            LoadingToast(false);
            SuccessToast(response.message);
            e.target.reset();
        } catch (err) {
            console.error('An error occurred:', err);
            ErrorToast('An error occurred. Please try again later.');
            LoadingToast(false);
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
                        <input
                            type="text"
                            placeholder="Employee ID"
                            name="EmployeeID"
                            id='EmployeeID'
                        />
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
