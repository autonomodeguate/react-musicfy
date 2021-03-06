import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Pages 
import { Home } from '../pages/Home/Home';
import { Settings } from '../pages/Settings/Settings';

export const RoutesC = (props) => {
    const { user, setReloadApp } = props;
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/artists" exact>
                        <h1>Artistas</h1>
                    </Route>
                    <Route path="/settings" exact>
                        <Settings user={ user } setReloadApp={ setReloadApp } />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}
