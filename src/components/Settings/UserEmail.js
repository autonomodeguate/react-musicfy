import React, { useState } from 'react';
import {Button, Form, Input, Icon} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { reauthenticate } from '../../utils/Api';
import { alertErrors } from '../../utils/AlertErrors';
import { app } from '../../utils/Firebase';
import 'firebase/auth';

export const UserEmail = (props) => {

    const onEdit = () => {
        setTitleModal('Actualizar Email');
        setContentModal(<ChangeEmailFrom email={user.email} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    const {
        user,
        setShowModal,
        setTitleModal,
        setContentModal,
        setReloadApp
    } = props;

    return (
        <div className="user-email">
            <h3>Email: {user.email}</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}

function ChangeEmailFrom(props) {

    const { email, setShowModal } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password:"" });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = ()=> {
        if(!formData.email) {
            toast.warning('El email es igual.');
        } else {
            setIsLoading(true);
            reauthenticate(formData.password)
            .them(()=>{
                const currentUser = app.auth().currentUser;
                currentUser.updateEmail(formData.email)
                .them(()=>{
                    toast.success('Email actualizado');
                    setIsLoading(false);
                    setShowModal(false);
                    currentUser.sendEmailVerification().then(()=>{
                        app.auth().signOut();
                    })
                })
                .catch((err) => {
                    alertErrors(err?.code);
                    setIsLoading(false);
                })
            })
            .catch((err) => {
                alertErrors(err?.code);
                setIsLoading(false);
            })
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    type="text" 
                    defaultValue={ email } 
                    onChange={(e) => setFormData({...formData, email: e.target.value })}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type={ showPassword ? "text" : "password" }
                    placeholder="contraseña"
                    onChange={(e) => setFormData({...formData, password: e.target.value })}
                    icon={
                        <Icon 
                            name={showPassword ? "eye slash outline" : "eye"} 
                            link 
                            onClick={()=> setShowPassword(!showPassword)} 
                        />
                    }
                />
            </Form.Field>
            <Button
             type="submit" 
             loading={isLoading}
            >
                Actualizar email
            </Button>
        </Form>
    )
}
