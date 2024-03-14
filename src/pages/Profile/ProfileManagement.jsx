import React, { useState } from 'react';
import './ProfileManagement.scss';

const ProfileManagement = () => {
  // State variables for profile information
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile updated');
  };

  // Function to handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log('Password changed');
  };

  // Function to handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    // TODO: Implement profile picture upload logic
    console.log('Profile picture uploaded:', file);
  };

  return (
    <div className="profile-management">
      <h2>Profile Management</h2>
      {/* Profile Information */}
      <div className="profile-info">
        <img src={profilePicture} alt="Profile" />
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <button>Edit Profile</button>
        </div>
      </div>
      {/* Edit Profile Form */}
      <form className="edit-profile-form" onSubmit={handleProfileUpdate}>
        <h3>Edit Profile</h3>
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
      </form>
      {/* Change Password Form */}
      <form className="change-password-form" onSubmit={handleChangePassword}>
        <h3>Change Password</h3>
        <label>Current Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <label>Confirm New Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ProfileManagement;
