import React, {useState} from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import {toast} from 'react-toastify';
import {validateEmail} from '../../../utils/Validations';
import { app } from '../../../utils/Firebase';
import 'firebase/auth';

import './LoginForm.scss';

export const LoginForm = (props) => {

    const { setSelectedForm } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValueForm());

    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [user, setUser] = useState(null);

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        setFormErrors({});
        let errors = {};
        let formOk = true;

        if(validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }
        if(formData.password.lenght < 6) {
            errors.password = true;
            formOk = false;
        }
        setFormErrors(errors);
        if(formOk) {
            console.log('login correcto');
            setIsLoading(true);
            app.auth().signInWidthEmailAndPassword(formData.email, formData.password).then(resp=>{
                setUser(resp.user);
                setUserActive(resp.user.emailVerified);
                if(!Response.user.emailVerified) {
                    toast.warning('Verifica tu cuenta')
                }
            })
            .catch(err => {
                handlerErrors(err.code);
            })
            .finaly(()=>{
                setIsLoading(false);
            })
        }
    }

    return (
        <div className="login-form">
            <h1>Música para todos.</h1>
            <form onSubmit={onSubmit} onChange={onChange}>
                <Form.Field>
                    <Input 
                        type="text" 
                        name="email" 
                        placeholder="Correo electrónico" 
                        icon="mail outline" 
                        error={formErrors.email}
                    />
                    {formErrors.email && (
                        <span className="error-text">Por favor introduce un correo valido.</span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Contraseña" 
                        error={formErrors.password}
                        icon={
                            showPassword ? (
                                <Icon
                                    name="eye slash outline" 
                                    link
                                    onClick={handlerShowPassword}
                                />
                            ) : (
                                <Icon
                                    name="eye" 
                                    link
                                    onClick={handlerShowPassword}
                                /> 
                            )
                        }
                    />
                    {formErrors.password && (
                        <span className="error-text">La contraseña debe ser superior a 6 caracteres</span>
                    )}
                </Form.Field>
                <Button type="submit" loading={isLoading}>
                    Iniciar sesión
                </Button>
            </form>
            {
                !userActive && (
                    <ButtonResetSendEmailVerification 
                        user={user} 
                        setIsLoading={setIsLoading} 
                        setUserActive={setUserActive}
                    />
                )
            }
            <div className="login-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>¿No tienes cuenta? <span onClick={()=>setSelectedForm('register')}>Registrarse</span></p>
            </div>
        </div>
    )
}

function ButtonResetSendEmailVerification(props) {
    const {user, setIsLoading, setUserActive } = props;

    const resendVerificationsEmail = () => {
        user.sendEmailVerification().then(()=>{
            toast.success('Enviado el email de verificacion')
        }).catch((err)=>{
            handlerErrors(err.code);
        }).finaly(()=>{
            setIsLoading(false);
            setUserActive(true);
        })
    }

    return (
        <div className="resend-verification-email">
            <p>Si no has recibido el email de verificación puedes volver a solicitarlo haciendo <span onClick={resendVerificationsEmail}>click aqui</span></p>
        </div>
    )
}

function handlerErrors(code) {
    switch (code) {
        case "auth/wrong-passwor":
            toast.warning('El usuario o la contraseña son incorrectos');
            break;
        case "auth/too-many-request":
            toast.warning('Has enviado demasiadas solicitudes de reenvio de email de confirmación en muy poco tiempo');
            break;
        case "auth/user-not-found":
            toast.warning('Usuario o la contraseña son incorrectas');
            break;
        default:
            break;
    }
}

function defaultValueForm() {
    return {
        email: "",
        password: ""
    }
}