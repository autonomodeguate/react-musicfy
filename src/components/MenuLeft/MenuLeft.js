import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router";

import { isUserAdmin } from '../../utils/Api';
import { BasicModal } from '../Modal/BasicModal/BasicModal';
import './MenuLeft.scss';

const MenuLeft = (props) => {

    const {user, location} = props;

    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        setActiveMenu(location.pathname)
    }, [location])

    useEffect(() => {
        isUserAdmin(user.uid).then(response => {
            setUserAdmin(response);
        })
    }, [user]);

    const handlerMenu = (e, menu) => {
        // console.log(menu);
        setActiveMenu(menu.to);
    }

    const handlerModal = (type) => {
        switch (type) {
            case "artis":
                setTitleModal('Nuevo artista');
                setContentModal(<h2>Form nuevo artista</h2>);
                setShowModal(true);
                break;
            case "song":
                setTitleModal('Nueva canción');
                setContentModal(<h2>Form nueva cancion</h2>);
                setShowModal(true);
                break;        
            default:
                setTitleModal(null);
                setContentModal(null)
                setShowModal(false);
                break;
        }
    }

    return (
        <>
            <Menu className="menu-left" vertical>
                <div className="top">
                    <Menu.Item 
                        as={Link} 
                        to="/" 
                        active={activeMenu === "/"} 
                        onClick={handlerMenu}>
                        <Icon name="home" /> Inicio
                    </Menu.Item>
                    <Menu.Item 
                        as={Link} 
                        to="/artists"
                        active={activeMenu === "/artists"} 
                        onClick={handlerMenu}>
                        <Icon name="music" /> Artistas
                    </Menu.Item>
                </div>
                {userAdmin && (
                    <div className="footer">
                        <Menu.Item onClick={()=>{handlerModal('artist')}}>
                            <Icon name="plus square outline" /> Nuevo artista
                        </Menu.Item>
                        <Menu.Item onClick={()=>{handlerModal('song')}}>
                            <Icon name="plus square outline" /> Nuevo canción
                        </Menu.Item>
                    </div>
                )}
            </Menu>
            <BasicModal 
                show={showModal} 
                setShow={setShowModal} 
                title={titleModal}
            >
                {contentModal}
            </BasicModal>
        </>
    )
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <MenuLeft {...props} navigate={navigate} />
}

export default WithNavigate;