import React from 'react';
import axios from 'axios';

const MicrosoftSignIn = () => {
  const handleMicrosoftSignIn = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login/microsoft');
      // Redirect user to Microsoft login page
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('Error signing in with Microsoft:', error);
    }
  };

  return (
    <button onClick={handleMicrosoftSignIn}>Sign in with Microsoft</button>
  );
};

export default MicrosoftSignIn;
