
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { app } from './utils/Firebase';
import 'firebase/auth';

import { Auth } from './pages/Auth/Auth';
import { LoggedLayout } from './layouts/LoggedLayout/LoggedLayout';

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  app.auth().onAuthStateChange(currentUser => {

    if(currentUser?.emailVerified) {
      app.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);

  });

  if(isLoading) {
    return null;
  }

  return (
    <>
      { !user ? <Auth /> : <LoggedLayout user={user} /> }
      <ToastContainer 
        position="top-center"
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtr={false} 
        pauseOnVisibilityChange 
        draggable 
        pauseOnHover={false} 
      />
    </>
  )

}

export default App;


