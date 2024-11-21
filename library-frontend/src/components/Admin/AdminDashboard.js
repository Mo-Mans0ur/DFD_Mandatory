// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminDashboard.css';

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json(); // Parse JSON response
          setAdminData(data);
        } else {
          throw new Error('Access denied. Admins only.');
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        setMessage('Access denied. Admins only.');
        navigate('/');
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {message && <p>{message}</p>}
      {adminData ? (
        <div className="dashboard-section">
          <p>Welcome to the admin dashboard.</p>
          {/* Render additional admin-specific content here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminDashboard;
