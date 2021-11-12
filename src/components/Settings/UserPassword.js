import React, { useState } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { reauthenticate } from '../../utils/Api';
import { alertErrors } from '../../utils/AlertErrors';
import { app } from '../../utils/Firebase';
import 'firebase/auth';

export const UserPassword = (props) => {

    const {
        setShowModal,
        setTitleModal,
        setContentModal
    } = props;

    const onEdit = () => {
        setTitleModal('Actualizar pass');
        setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
        setShowModal(true);
    }

    return (
        <div className="user-password">
            <h3>Contraseña: *** *** *** ***</h3>
            <Button 
                circular 
                onClick={onEdit}
            >Actualizar contraseña</Button>
        </div>
    )
}


function ChangePasswordForm(props) {

    const { setShowModal } = props;

    const [formData, setFormData] = useState({
        currentPasword: "",
        newPassword: "",
        repeatNewPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = ()=>{
        if(!formData.currentPasword || !formData.newPassword || !formData.repeatNewPassword) {
            toast.warning('Las contraseñas no pueden estar vacias');
        } else if(formData.currentPasword === formData.newPassword) {
            toast.warning('La nueva contraseña no puede ser igual a la anterior');
        } else if(formData.newPassword !== formData.repeatNewPassword) {
            toast.warning('Las nuevas contraseñas no son iguales');
        } else if(formData.newPassword.length < 6) {
            toast.warning('La contraseña debe tener minimo 6 caracteres');
        } else {
            setIsLoading(true);
            reauthenticate(formData.currentPasword)
            .then(()=>{
                const currentUser = app.auth().currentUser;
                currentUser.updatePassword(formData.newPassword)
                .then(()=>{
                    toast.success('Contraseña actualizada');
                    setIsLoading(false);
                    setShowModal(false);
                    app.auth().signOut();
                })
                .catch((err)=> {
                    alertErrors(err?.code);
                    setIsLoading(false);
                })

            })
            .catch((err)=>{
                alertErrors(err?.code);
                setIsLoading(false);
            })
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña actual"
                    onChange={(e)=>{setFormData({ ...formData, currentPasword: e.target.value })}}
                    icon={
                        <Icon 
                            name={ showPassword ? "eye slash outline" : "eye" } 
                            link 
                            onClick={ ()=>setShowPassword(!showPassword) }
                        />
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    onChange={(e)=>{setFormData({ ...formData, newPassword: e.target.value })}}
                    icon={
                        <Icon 
                            name={ showPassword ? "eye slash outline" : "eye" } 
                            link 
                            onClick={ ()=>setShowPassword(!showPassword) }
                        />
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Repetir nueva contraseña"
                    onChange={(e)=>{setFormData({ ...formData, repeatNewPassword: e.target.value })}}
                    icon={
                        <Icon 
                            name={ showPassword ? "eye slash outline" : "eye" } 
                            link 
                            onClick={ ()=>setShowPassword(!showPassword) }
                        />
                    }
                />
            </Form.Field>
            <Button 
                type="submit" 
                loading={isLoading}
            >Cambiar contraseña</Button>
        </Form>
    )
}