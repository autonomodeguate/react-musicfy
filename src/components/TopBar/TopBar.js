import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import userImage  from '../../assets/png/user.png'
import './TopBar.scss';

import { app } from '../../utils/Firebase';
import 'firebase/auth';

const TopBar = (props) => {

    const { user, history } = props;

    const goBack = () => {
        history.goBack();
    }

    const logout = () => {
        app.auth().signOut();
    }

    return (
        <div className="top-bar">
            <div className="top-bar__left">
                <Icon name="angle left" onClick={goBack} />
            </div>
            <div className="top-bar__right">
                <Link to="/settings">
                    <Image src={ userImage } />
                    { user.displayName }
                </Link>
                <Icon name="power off" onClick={logout} />
            </div>
        </div>
    )
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <TopBar {...props} navigate={navigate} />
}

export default WithNavigate;
