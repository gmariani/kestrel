import React from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
// eslint-disable-next-line
import { SignIn, Home, Browse, Details, Watch } from './pages';
import * as ROUTES from './constants/routes';
// import { ProtectedRoute } from './helpers/routes';
import { useAuthListener } from './hooks';

export default function App() {
    const { user } = useAuthListener();
    return user ? (
        <Router>
            <Switch>
                <Redirect from={ROUTES.SIGN_IN} to={ROUTES.BROWSE} />

                <Route path={ROUTES.BROWSE_ID}>
                    <Browse />
                </Route>

                <Route path={ROUTES.DETAILS_ID}>
                    <Details />
                </Route>

                <Route path={ROUTES.WATCH_ID}>
                    <Watch />
                </Route>

                <Route exact path={ROUTES.HOME}>
                    <Redirect to={ROUTES.BROWSE} />
                </Route>
            </Switch>
        </Router>
    ) : (
        <Router>
            <Switch>
                <Redirect from={ROUTES.SIGN_IN} to={ROUTES.HOME} />

                <Route exact path={ROUTES.HOME}>
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    );
}
