import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '467394960723-1cpclu106v0f6tub3tg6hme9qoge378m.apps.googleusercontent.com';

const GoogleSignIn = () => {
  const onSuccess = (credentialResponse) => {
    const id_token = credentialResponse.credential;

    // Send the ID token to your backend for verification
    fetch('http://localhost:5000/api/google-signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: id_token }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
