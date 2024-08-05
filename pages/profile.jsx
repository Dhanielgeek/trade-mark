import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMDU0MTUxMTY4IiwidHlwZSI6InVzZXIiLCJpYXQiOjE3MTI0OTU3NDIsImV4cCI6MTcxMjUzODk0Mn0.Rhr6OQ05_NInxGNdWOOYj8YeH6WUOPcmsaZy-d3n19k";

  useEffect(() => {
    // const token = localStorage.getItem("token");

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://peaktradex-backend.onrender.com/api/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.data.name}</p>
      <p>Email: {userData.data.email}</p>
      {/* Display other user profile data as needed */}
    </div>
  );
};

export default UserProfile;
