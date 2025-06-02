import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/feedback');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit} className="auth-form">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={onChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={onChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={onChange} required minLength={6} />

        <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
      <p>
        Already have an account? <Link to="/login" style={{ color: 'darkblue' }}>Login here</Link>
      </p>
    </div>
  );
};

export default Signup;

