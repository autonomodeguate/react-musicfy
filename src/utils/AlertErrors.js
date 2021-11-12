import React from 'react';
import { toast } from 'react-toastify';

export const alertErrors = (type) => {
    switch (type) {
        case 'auth/wrong-password':
            toast.warning('La contraseña ingresada es inválida');
            break;
        case 'auth/email-already-in-use':
            toast.warning('El nuevo email ya esta en uso.');
            break;
        default:
            toast.warning('Error del servidor, intentelo mas tarde.')
            break;
    }
}
