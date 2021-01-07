import React from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { SignIn, Home, Browse, Details, Watch } from './pages';
import * as ROUTES from './constants/routes';
import { useAuthListener } from './hooks';

export default function App() {
    const { user } = useAuthListener();
    return user ? (
        <Router basename='/kestrel/'>
            <Switch>
                <Redirect from={`${ROUTES.SIGN_IN}`} to='/browse' />

                <Route path={`${ROUTES.BROWSE}`}>
                    <Browse />
                </Route>

                <Route path={`${ROUTES.DETAILS}`}>
                    <Details />
                </Route>

                <Route exact path={[`${ROUTES.WATCH_MOVIE}`, `${ROUTES.WATCH_TV}`]}>
                    <Watch />
                </Route>

                <Route exact path={`${ROUTES.HOME}`}>
                    <Redirect to='/browse' />
                </Route>

                <Route>
                    <Home />
                </Route>
            </Switch>
        </Router>
    ) : (
        <Router basename='/kestrel'>
            <Switch>
                <Redirect from={`${ROUTES.SIGN_IN}`} to={`${ROUTES.HOME}`} />

                <Route exact path={`${ROUTES.HOME}`}>
                    <SignIn />
                </Route>

                <Route>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
