
import React, { useState } from 'react';
import AuthOptions from '../../components/Auth/AuthOptions/AuthOptions';
import { RegisterForm } from '../../components/Auth/RegisterForm/RegisterForm';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';
import BackgroundAuth from '../../assets/jpg/background-auth.jpg'
import LogoNameWhite from '../../assets/png/logo-name-white.png'
import './Auth.scss';

export const Auth = () => {
    const [selectedForm, setSelectedForm] = useState(null);
    const handleForm = () => {
        switch (selectedForm) {
            case "Login":
                return <LoginForm setSelectedForm={setSelectedForm} />;
            case "register":
                return <RegisterForm setSelectedForm={setSelectedForm} />
            default:
                return <AuthOptions setSelectedForm={setSelectedForm} />
        }
    }
    return (
        <div className="auth" style={{backgroundImage: `url(${BackgroundAuth})`}}>
            <div className="auth__dark" />
            <div className="auth__box">
                <div className="auth__box-logo">
                    <img src={LogoNameWhite} alt="Musicfy" />
                </div>
                {handleForm}
            </div>
        </div>
    )
}