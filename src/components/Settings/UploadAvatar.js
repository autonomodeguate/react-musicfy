import React, { useState, useCallback } from 'react';
import { Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import noAvatar from '../../assets/png/user.png';
import { app } from '../../utils/Firebase';
import 'firebase/storage';
import 'firebase/auth';

export const UploadAvatar = (props) => {

    const { user, setReloadApp } = props;
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    const onDrop = useCallback( acceptedFiles => {
        const file = acceptedFiles[0];
        setAvatarUrl(URL.createObjectURL(file));
        uploadImage(file).then(()=>{
            updateUserAvatar();
        });
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const uploadImage = (file) => {
        const ref = app.storage().ref().child(`avatar/${user.uid}`);
        return ref.put(file);
    }

    const updateUserAvatar = () => {
        app.storage().ref(`avatar/${user.uid}`).getDownloadURL().then(async(response) => {
            await app.auth().currentUser.updateProfile({photoURL: response});
            setReloadApp(prevState => !prevState)
        }).catch(()=>{
            toast.error('Error al actualizar el avatar');
        })
    }

    return (
        <div className="user-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            { isDragActive ? (
                <Image src={ noAvatar } />
            ) : (
                <Image src={ avatarUrl ? avatarUrl : noAvatar } />
            ) }
        </div>
    )
}
