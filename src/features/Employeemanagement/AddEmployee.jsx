import React, { useState } from 'react';
import './AddEmployee.scss';
import { useAddEmployeeMutation } from './employeeApi';
import { useGetPositionsQuery } from '../Position/positionApi';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import Spinner from '../../components/spinner/spinner';

const AddEmployee = ({ closeEmployee }) => {
    const { data: positions, isError } = useGetPositionsQuery();
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        PositionID: '',
        Address: '',
        BirthDate: '',
        PhotoURL: '',
        ContactInfo: '',
        Email: '',
        Password: '',
        Gender: ''
    });
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const [addEmployee] = useAddEmployeeMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        LoadingToast(true)

        try {
            const data = new FormData();
            data.append('file', file);
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
                throw new Error("Cloudinary upload failed");
            }

            const response = await addEmployee(formData).unwrap();
            SuccessToast(response.message);
            closeEmployee();
            resetForm();
        } catch (err) {
            ErrorToast("Could not add employee");
        } finally {
            LoadingToast(false)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const resetForm = () => {
        setFormData({
            Firstname: '',
            Lastname: '',
            PositionID: '',
            Address: '',
            BirthDate: '',
            PhotoURL: '',
            ContactInfo: '',
            Email: '',
            Password: '',
            Gender: ''
        });
        setFile(null);
    };

    return (
        <div>
            <div className="form-container">
                <form className='eventWrap1' onSubmit={handleSubmit}>
                    <div className="btn">
                    </div>
                    <div className="textarea">
                        { <Spinner />}

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
                        <select
                            value={formData.PositionID}
                            onChange={handleChange}
                            name="PositionID"
                        >
                            <option value="">Select Position</option>
                            {positions &&
                                positions.map((position) => (
                                    <option key={position.PositionID} value={position.PositionID}>
                                        {position.Position}
                                    </option>
                                ))}
                        </select>
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
                            name="PhotoURL"
                            onChange={handleFileChange}
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
                                <button type="submit" disabled={isLoading}>
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
