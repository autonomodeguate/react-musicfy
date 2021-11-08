
import React, { useState } from 'react';

import firebase from './utils/Firebase';
import 'firebase/auth';

import { Auth } from './pages/Auth/Auth';

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChange(currentUser => {
    if(!currentUser) {
      setUser(true);
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  });

  if(isLoading) {
    return null;
  }

  return !user ? <Auth /> : <UserLogued />;

}

function UserLogued( ) {

  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
      <h1>Usuario Logueado</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}


export default App;


