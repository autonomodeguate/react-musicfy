import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { app } from '../../../utils/Firebase';
import 'firebase/auth';
import './RegisterForm.scss';
import { validateEmail } from '../../../utils/Validations';

export const RegisterForm = (props) => {
    const {  setSelectedForm } = props;

    const [formData, setFormData] = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

        setFormError({});
        let errors = {};
        let formOk = true;

        if(!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }
        if(formData.password.lenth < 6) {
            errors.password = true;
            formOk = false;
        }
        if(!formData.username) {
            errors.username = true;
            formOk = false;
        }

        setFormError(errors);

        if(formOk) {
            setIsLoading(true);
            app.auth().createUserWithEailAndPassword(formData.email, formData.password)
            .them(()=>{
                console.log('Ok, registro completado');
                changeUserName();
                sendVerificationEmail();
            }).catch(()=>{
                toast.error('error al crear una cuenta');
            }).finaly(()=>{
                setIsLoading(false);
                setSelectedForm(null);
            })
        }
    }

    const changeUserName = () => {
        app.auth().currentUser.updateProfile({
            displayName: formData.username
        }).catch(() => {
            toast.error("Error al asignar el nombre de usuario.");
        })
    }

    const sendVerificationEmail = () => {
        app.auth().currentUser.sendEmailVerification().then(()=>{
            toast.success('Se ha enviado un email de verificacion');
        }).catch(()=>{
            toast.error('Error al enviar el email de verificacion.')
        })
    }

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis!</h1>
            <form onSubmit={ onSubmit } onChange={onChange}>
                <Form.Field>
                    <Input 
                        type="text" 
                        name="email" 
                        placeholder="Correo electronico"
                        icon="mail outline" 
                        error={formError.email}
                    />
                    {formError.email && (
                        <span className="error-text">
                            Por favor, introduce en email valido.
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        placeholder="Contraseña"
                        error={formError.password}
                        icon={showPassword ? (
                            <Icon name="eye slash outline" link onClick={handlerShowPassword} />
                        ) : <Icon name="eye" link onClick={handlerShowPassword} /> } 
                        />
                        {formError.password && (
                            <span className="error-text">
                                Por favor, elige una contraseña mayor a 6 caracteres.
                            </span>
                        )}
                </Form.Field>
                <Form.Field>
                    <Input 
                        type="text" 
                        name="username" 
                        placeholder="¿Cómo deberiamos llamarte?"
                        icon="user circle outline" 
                        error={formError.username}
                    />
                    {formError.username && (
                        <span className="error-text">
                            Por favor, introduce tu nombre.
                        </span>
                    )}
                </Form.Field>
                <Button type="submit" loading={isLoading}>Continuar</Button>
            </form>
            <div className="register-form__options">
                <p onClick={()=>setSelectedForm(null)}>Volver</p>
                <p>
                    ¿Ya tienes MusicFy?
                    <span onClick={()=>setSelectedForm('login')}>Iniciar sesión</span>
                </p>
            </div>
        </div>
    )
}

function defaultValueForm() {
    return {
        email: "",
        password: "",
        username: ""
    }
}