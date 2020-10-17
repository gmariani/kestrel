import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line
import { SignIn, Home, Browse } from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { useAuthListener } from './hooks';

export default function App() {
    const { user } = useAuthListener();

    return (
        <Router>
            <Switch>
                {/* <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.SIGN_IN}>
                    <SignIn />
                </IsUserRedirect> */}
                <ProtectedRoute user={user} path={ROUTES.BROWSE}>
                    <Browse />
                </ProtectedRoute>
                <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.HOME}>
                    {/* <Home /> */}
                    <SignIn />
                </IsUserRedirect>
            </Switch>
        </Router>
    );
}
