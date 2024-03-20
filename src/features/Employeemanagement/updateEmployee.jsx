import React, { useState } from 'react';
import { useUpdateEmployeeMutation } from './employeeApi';
import { SuccessToast, ErrorToast } from '../../components/toaster/Toaster';

const UpdateUserForm = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [updateUser, { error }] = useUpdateEmployeeMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser({employee: editedUser });
      SuccessToast(response.message);
      onClose();
    } catch (error) {
      ErrorToast("Failed to update user details.");
    }
  };

  return (
    <div className='update-user-form'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="Firstname"
          value={editedUser.Firstname || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="Lastname"
          value={editedUser.Lastname || ''}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="Email"
          value={editedUser.Email || ''}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
      {error && <ErrorToast message="Failed to update user details." />}
    </div>
  );
};

export default UpdateUserForm;
