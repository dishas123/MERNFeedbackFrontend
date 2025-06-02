import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await API.get('/profile');
      setProfile(res.data);
    } catch {
      setError('Failed to load profile');
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onChangeProfile = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const onChangePasswords = e => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const onSubmitProfile = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoadingProfile(true);
    try {
      await API.put('/profile', profile);
      setSuccess('Profile updated successfully');
    } catch {
      setError('Failed to update profile');
    } finally {
      setLoadingProfile(false);
    }
  };

  const onSubmitPassword = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoadingPassword(true);
    try {
      await API.put('/profile/change-password', {   // Fixed endpoint here
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setSuccess('Password changed successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch {
      setError('Failed to change password');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={onSubmitProfile} className="profile-form">
        <label>Name</label>
        <input name="name" value={profile.name} onChange={onChangeProfile} required />

        <label>Email (read-only)</label>
        <input name="email" value={profile.email} readOnly />

        <label>Phone</label>
        <input name="phone" value={profile.phone} onChange={onChangeProfile} />

        <label>Date of Birth</label>
        <input
          name="dob"
          type="date"
          value={profile.dob ? profile.dob.split('T')[0] : ''}
          onChange={onChangeProfile}
        />

        <label>Address</label>
        <textarea name="address" value={profile.address} onChange={onChangeProfile} rows={3} />

        <button type="submit" disabled={loadingProfile}>
          {loadingProfile ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={onSubmitPassword} className="password-form">
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={onChangePasswords}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={onChangePasswords}
          required
          minLength={6}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          onChange={onChangePasswords}
          required
          minLength={6}
        />

        <button type="submit" disabled={loadingPassword}>
          {loadingPassword ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default Profile;

