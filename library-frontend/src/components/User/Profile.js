// src/components/User/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log("Token retrieved from localStorage:", token); // Debug line

       // Add this log to verify the API URL
    console.log("API URL:", process.env.REACT_APP_API_URL);

if (!token) {
  navigate("/"); // Redirect if not authenticated
  return;
}

      if (!token) {
        navigate('/'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user); // Assuming `user` field in response
        } else {
          console.error('Failed to fetch user data: ', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {userData ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          {/* Add additional user info here as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
