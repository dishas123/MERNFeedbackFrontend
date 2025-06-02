import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '10px 20px',
      background: '#3498db',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/feedback" style={{ color: 'white', marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>
          Feedback
        </Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          Profile
        </Link>
      </div>
      <button
        onClick={logout}
        style={{
          background: '#e74c3c',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

