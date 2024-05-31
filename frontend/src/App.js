import React from 'react';
import GoogleSignIn from './SignIn/GoogleSignIn';
import MicrosoftSignIn from './SignIn/MicrosoftSignIn';

function App() {
  return (
    <div className="App">
      <h1>Sign-In</h1>
      <GoogleSignIn />
      <MicrosoftSignIn />
    </div>
  );
}

export default App;
