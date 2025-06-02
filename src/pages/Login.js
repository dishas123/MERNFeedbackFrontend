import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]); 
  const [loading, setLoading] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/feedback');
    } catch (err) {
      const backendErrors = err.response?.data?.errors;
      if (backendErrors && Array.isArray(backendErrors)) {
        setErrors(backendErrors.map(e => e.msg)); 
      } else {
        const fallbackError = err.response?.data?.message || 'Login failed';
        setErrors([fallbackError]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>

      {}
      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((msg, idx) => (
            <li key={idx} className="error">{msg}</li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup" style={{ color: 'darkblue' }}>Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;


