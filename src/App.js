import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn, Home } from './pages';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import './App.css';
import * as ROUTES from './constants/routes';
import { useAuthListener } from './hooks';

export default function App() {
    const { user } = useAuthListener();

    return (
        <Route>
            <Switch>
                <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.SIGN_IN}>
                    <SignIn />
                </IsUserRedirect>
                <ProtectedRoute user={user} path={ROUTES.HOME}>
                    <Home />
                </ProtectedRoute>
            </Switch>
        </Route>
    );
}
