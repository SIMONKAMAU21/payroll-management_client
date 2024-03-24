import React, { useState } from 'react';
import './AddEmployee.scss';
import { useAddEmployeeMutation } from './employeeApi';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import { RxDashboard } from "react-icons/rx";

const AddEmployee = ({ closeEmployee }) => {
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        PositionID: '',
        Address: '',
        BirthDate: '',
        PhotoURL: '',
        ContactInfo: '',
        file: {},
        Admin: '',
        Email: '',
        Password: '',
        schedule: '',
        Gender: '' // Added gender field
    });
    const [file, setFile] = useState(null)

    const [addEmployee, { isLoading, error }] = useAddEmployeeMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        const file_data = file;
        data.append('file', file_data);
        data.append('upload_preset', 'wdfjbcug');
        data.append('cloud_name', 'diyuy63ue');



        const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/diyuy63ue/image/upload", {
            method: 'POST',
            body: data
        });

        const responseJson = await cloudinaryRes.json();
        if (cloudinaryRes.ok) {
            const { secure_url } = responseJson
            formData.PhotoURL = secure_url
        }
        else {
            console.error("Cloudinary upload failed:", responseJson);
        }

        try {
            console.log("form data ", formData);
            const response = await addEmployee(formData).unwrap();
            SuccessToast(response.message);
            closeEmployee();
            setFormData({
                Firstname: '',
                Lastname: '',
                PositionID: '',
                Address: '',
                BirthDate: '',
                PhotoURL: '',
                file: null,
                ContactInfo: '',
                Admin: '',
                Email: '',
                Password: '',
                schedule: '',
                Gender: '' 
            });
        } catch (err) {
            ErrorToast(response.message);
        }
    };
    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0]; 
            setFormData({ ...formData, [e.target.name]: file }); // Update the state with the file
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value }); // Update the state with other form fields
        }
        console.log("new state is ", formData);
    };


    return (
        <div>
            <div className="form-container">
                <form className='eventWrap' onSubmit={handleSubmit}>
                    <div className="btn">
                        {/* <button onClick={closeEmployee}>X</button> */}
                    </div>
                    <div className="textarea">
                        <div className="animation">
                             <RxDashboard size='34px' color='rgb(0, 211, 248)' />
                        </div> 
                        <div className="animation1">
                             <RxDashboard size='34px' color='rgb(0, 211, 248)' />
                        </div> 
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
                            placeholder="Gender"
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleChange}
                        />
                       
                        <input
                            type="text"
                            placeholder="PositionID"
                            name="PositionID"
                            value={formData.PositionID}
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
                            onChange={(e) => {
                                const file = e.target.files[0]; // Get the selected file
                                setFile(file)
                                // handleChange(file); // Pass the file to handleChange function
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Contact Info"
                            name="ContactInfo"
                            value={formData.ContactInfo}
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
