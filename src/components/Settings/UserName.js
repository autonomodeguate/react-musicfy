import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { app } from '../../utils/Firebase';
import 'firebase/auth';

export const UserName = (props) => {
    const { user, setShowModal, setTitleModal, setContentModal, setReloadApp } = props;

    const onEdit = () => {
        setTitleModal('Actualizar nombre');
        setContentModal(
            <ChangeDispalyNameForm 
            setShowModal={setShowModal} 
            displayName={ user.displayName } 
            />
        );
        setShowModal(true);
    }

    return (
        <div className="user-name">
            <h2>{ user.displayName }</h2>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}

function ChangeDispalyNameForm(props) {
    
    const { displayName, setShowModal, setReloadApp } = props;
    const [formData, setFormData] = useState({ displayName: displayName});
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if(!formData.displayName || formData.displayName === displayName) {
            setShowModal(false);
        } else {
            setIsLoading(true);
            app.auth().currentUser.updatedProfile({ displayName: formData.displayName })
                .then(()=>{
                    setReloadApp(prevState => !prevState);
                    toast.success('Nombre actualizado');
                    setIsLoading(false);
                    setShowModal(false);
                }).catch(()=>{
                    toast.error('Error al actualizar el nombre');
                    setIsLoading(false);
                });
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    defaultValue={displayName}
                    onChange={(e)=> setFormData({ displayName: e.target.value })}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar nombre
            </Button>
        </Form>
    )
}