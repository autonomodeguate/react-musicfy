import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import MenuLeft from '../../components/MenuLeft/MenuLeft';
import WithNavigate from '../../components/TopBar/TopBar';
import { RoutesC } from '../../routes/RoutesC';
import './LoggedLayout.scss';

export const LoggedLayout = (props) => {

    const { user, setReloadApp }  = props;

    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLeft user={user} />
                    </Grid.Column>
                    <Grid.Column className="content" width={13}>
                        <WithNavigate user={user} />
                        <RoutesC user={ user } setReloadApp={setReloadApp} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <h2>Player</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    )
}
