import React, { useState } from 'react';
import './ProfileManagement.scss';

const ProfileManagement = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profile updated');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("consol.log changes with steve hotcodes")
    console.log('Password changed');
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');
    formData.append('cloud_name', 'your_cloud_name');

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile picture uploaded:', data.secure_url);
        setProfilePicture(data.secure_url);
      } else {
        console.error('Failed to upload profile picture:', data);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="profile-management">
      <h2>Profile Management</h2>
      <div className="profile-info">
        <img src={profilePicture} alt="Profile" />
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <button>Edit Profile</button>
        </div>
      </div>
   <div className="profile-holder">
   <form className="edit-profile-form" onSubmit={handleProfileUpdate}>
<div className="head">  <h3>Change Profile</h3></div>        <div className="inputs">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <label>Upload Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
        <button type="submit">Save Changes</button>
        </div>
      </form>
      <form className="change-password-form" onSubmit={handleChangePassword}>
      <div className="head">  <h3>Change Password</h3></div>
   <div className="inputs">
   <label>Current Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <label>Confirm New Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Change Password</button>
   </div>
      </form>
   </div>
    </div>
  );
};

export default ProfileManagement;
