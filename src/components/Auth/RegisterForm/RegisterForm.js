import React from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import firebase from '../../../utils/Firebase';
import 'firebase/auth';
import './RegisterForm.scss';

export const RegisterForm = (props) => {
    const {  setSelectedForm } = props;
    const onSubmit = ()=> {
        console.log('Formulario enviado');
    }
    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis!</h1>
            <form onSubmit={ onSubmit }>
                <Form.Field>
                    <Input 
                        type="text" 
                        name="email" 
                        placeholder="Correo electronico"
                        icon="mail outline" 
                        // onChange={}
                        // error={}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        type="password" 
                        name="password" 
                        placeholder="Contraseña"
                        icon="eye" 
                        // onChange={}
                        // error={}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        type="text" 
                        name="username" 
                        placeholder="¿Cómo deberiamos llamarte?"
                        icon="user circle outline" 
                        // onChange={}
                        // error={}
                    />
                </Form.Field>
                <Button type="submit">Continuar</Button>
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