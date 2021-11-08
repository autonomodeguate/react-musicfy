import React from 'react';
import { Button } from 'semantic-ui-css';
import './AuthOptions.scss';

export const AuthOptions = (props) => {
    const { setSelectedForm } = props;
    return (
        <div className="auth-options">
            <h2>Millones de canciones, gratis en Musicfy</h2>
            <button className="register" onClick={()=>{setSelectedForm("register")}}>Registrate gratis</button>
            <button className="login" onClick={()=>{setSelectedForm("login")}}>Ininicar Sesión</button>
        </div>
    )
}
