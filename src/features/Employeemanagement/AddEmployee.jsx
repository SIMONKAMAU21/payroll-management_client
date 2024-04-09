import React, { useState } from 'react';
import './AddEmployee.scss';
import { useAddEmployeeMutation } from './employeeApi';
import { useGetPositionsQuery } from '../Position/positionApi';
import { SuccessToast, ErrorToast, LoadingToast } from '../../components/toaster/Toaster';
import Spinner from '../../components/spinner/spinner';

const AddEmployee = ({ closeEmployee }) => {
    const {data:positions ,isError}=useGetPositionsQuery();
    const [position,setPosition]=useState('')
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
        Gender: ''
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
            ErrorToast("could not add employee");
            LoadingToast(false)
        }
    };
    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0]; 
            setFormData({ ...formData, [e.target.name]: file }); 
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value }); 
        }
    };


    return (
        <div>
            {/* <button onClick={closeEmployee}> close</button> */}
            <div className="form-container">
                <form className='eventWrap1' onSubmit={handleSubmit}>
                    <div className="btn">
                    </div>
                    <div className="textarea">
                        
                        <div className="animation">
                        <Spinner/>
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
                       <select    value={formData.PositionID}
                        onChange={()=>setPosition(e.target.value)}>
                     <option value="">
                        Select Position
                     </option>
                     {positions && positions.map(position=>(
                        <option key={position.PositionID} value={position.PositionID}>
                            {position.PositionID} {position.Position}

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
                          
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
