import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Pages 
import { Home } from '../pages/Home/Home';

export const RoutesC = () => {
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
                        <h1>Settings</h1>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}
