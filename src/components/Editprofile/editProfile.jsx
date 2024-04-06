import React, { useState } from 'react';
import { useUpdateEmployeeMutation } from '../../features/Employeemanagement/employeeApi';
import { useEffect } from 'react';
import { ErrorToast, SuccessToast } from '../toaster/Toaster';
import  Modal from '../modal/modal'
import Spinner from '../spinner/spinner'

const UpdateEmployee = ({ closeEmployee }) => {
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        PositionID: '',
        Address: '',
        BirthDate: '',
        PhotoURL: '',
        ContactInfo: '',
        Admin: '',
        Email: '',
        Password: '',
        Schedule: '',
        Gender: ''
    });
    const [file, setFile] = useState(null);
    const [employeeData, setEmployeeData] = useState(null)
    useEffect(() => {
        const userDetailsFromLocalStroge = JSON.parse(localStorage.getItem('userDetails'));
        if (userDetailsFromLocalStroge) {
            setEmployeeData(userDetailsFromLocalStroge)
            setFormData(userDetailsFromLocalStroge)
        }
    }, []);
    const [updateEmployee, { isLoading, error }] = useUpdateEmployeeMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        const file_data = file || formData.PhotoURL;
        data.append('file', file_data);
        data.append('upload_preset', 'wdfjbcug');
        data.append('cloud_name', 'diyuy63ue');
        const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/diyuy63ue/image/upload", {
            method: 'POST',
            body: data
        });

        const responseJson = await cloudinaryRes.json();
        if (cloudinaryRes.ok) {
            const { secure_url } = responseJson;
            formData.PhotoURL = secure_url;
        } else {
            console.error("Cloudinary upload failed:", responseJson);
        }

        try {
            const response = await updateEmployee(formData).unwrap();
            localStorage.setItem('userDetails', JSON.stringify(formData))
            SuccessToast(response.message);
            closeEmployee();
        } catch (err) {
            ErrorToast("Could not update employee");
            console.error('Error updating employee:', err);
        }
    };

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            setFile(file);
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div>
            <Modal isOpen={true} onClose={closeEmployee}>
                <div className="form-container">
                    <form className='eventWrap1' onSubmit={handleSubmit}>
                        <div className="btn"></div>
                        <div className="textarea">
                         <Spinner/>
                            <input type="text" placeholder="First Name" name="Firstname" value={formData.Firstname} onChange={handleChange} />
                            <input type="text" placeholder="Last Name" name="Lastname" value={formData.Lastname} onChange={handleChange} />
                            <input type="text" placeholder="Gender" name="Gender" value={formData.Gender} onChange={handleChange} />
                            <input type="text" placeholder="PositionID" name="PositionID" value={formData.PositionID} onChange={handleChange} />
                            <input type="text" placeholder="Address" name="Address" value={formData.Address} onChange={handleChange} />
                            <input type="date" placeholder="Date of Birth" name="BirthDate" value={formData.BirthDate} onChange={handleChange} />
                            <input type="file" placeholder="Photo URL" name="PhotoURL" onChange={(e) => setFile(e.target.files[0])} />
                            <input type="text" placeholder="Contact Info" name="ContactInfo" value={formData.ContactInfo} onChange={handleChange} />
                            <input type="email" placeholder="Email" name="Email" value={formData.Email} onChange={handleChange} />
                            <input type="password" placeholder="Password" name="Password" value={formData.Password} onChange={handleChange} />
                            <input type="text" placeholder="Schedule" name="Schedule" value={formData.Schedule} onChange={handleChange} />
                        </div>
                        <div className="footer">
                            <div className="btn">
                                <button type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default UpdateEmployee;
