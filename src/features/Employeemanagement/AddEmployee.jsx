import React, { useState } from 'react';
import './AddEmployee.scss';
import { useAddEmployeeMutation } from './employeeApi';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster'; 

const AddEmployee = ({ closeEmployee }) => {
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        position:'',
        Address: '',
        BirthDate: '',
        PhotoURL: '',
        ContactInfo: '',
        Admin: '',
        Email: '',
        Password: ''
    });

    const [addEmployee, { isLoading, error }] = useAddEmployeeMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response=  await addEmployee(formData).unwrap(); 
            SuccessToast(response.message); 
            closeEmployee();
            setFormData({
               Firstname: '',
               Lastname: '',
               Address: '',
               BirthDate: '',
               PhotoURL: '',
               ContactInfo: '',
               Admin: '',
               Email: '',
               Password: ''
            });
        } catch (err) {
            ErrorToast(response.message); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <div className="form-container">
                <form className='eventWrap' onSubmit={handleSubmit}>
                    <div className="btn">
                        <button onClick={closeEmployee}>X</button>
                    </div>
                    <div className="textarea">
                        <input
                            type="text"
                            placeholder="First Name"
                            name="Firstname"
                            value={formData.Firstname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="Lastname"
                            value={formData.Lastname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            name="BirthDate"
                            value={formData.BirthDate}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            placeholder="Photo URL"
                            name="PhotoURL"
                            value={formData.PhotoURL}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Contact Info"
                            name="ContactInfo"
                            value={formData.ContactInfo}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Admin"
                            name="Admin"
                            value={formData.Admin}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                        />
                        <div className="footer">
                            <div className="btn">
                                <button type="submit" disabled={isLoading}>Add Employee</button>
                                {isLoading && <LoadingToast />} 
                                {error && <ErrorToast message={error.message} />}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
