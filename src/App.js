/* eslint-disable no-unreachable */
import React, { lazy, Suspense } from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';
// import { SignIn, Browse, Details, Watch } from './pages';
import * as ROUTES from './constants/routes';
import { useAuthListener } from './hooks';
import Loading from './components/Loading';

const SignIn = lazy(() => import('./pages/signin.js'));
const Browse = lazy(() => import('./pages/browse.js'));
const Details = lazy(() => import('./pages/details.js'));
const Watch = lazy(() => import('./pages/watch.js'));
const renderLoader = () => <Loading visible />;

// TODO: Used signed urls for generating meta and loading posters
// TODO: Add search button like hulu
// TODO: Add edit screen to modify the meta.json
// If meta.json is incomplete, populate from TMDB
// if (metadata.loaded && metadata.data.tmdb) {
//     if (!metadata.data.name || !metadata.data.year || !metadata.data.genres) {
//         // const tmdbData = getTMDB(meta.data.tmdb);
//         // meta.data.name = '';
//         // meta.data.year = 0;
//         // meta.data.genres = [];
//         // setMeta(meta.data);
//     }
// }

export default function App() {
    const { user } = useAuthListener();

    // Setup spatial navigation
    initNavigation({
        // debug: true,
        // visualDebug: true,
    });

    return user ? (
        <Router basename='/kestrel/'>
            <Switch>
                <Redirect from={`${ROUTES.SIGN_IN}`} to='/' />

                <Route exact path={[`${ROUTES.WATCH_MOVIE}`, `${ROUTES.WATCH_TV}`]}>
                    <Suspense fallback={renderLoader()}>
                        <Watch />
                    </Suspense>
                </Route>

                <Route path={`${ROUTES.DETAILS}`}>
                    <Suspense fallback={renderLoader()}>
                        <Details />
                    </Suspense>
                </Route>

                <Route path={`${ROUTES.BROWSE}`}>
                    <Suspense fallback={renderLoader()}>
                        <Browse />
                    </Suspense>
                </Route>

                <Route exact path={`${ROUTES.SIGN_IN}`}>
                    <Redirect to='/' />
                </Route>

                <Redirect to='/' />
            </Switch>
        </Router>
    ) : (
        <Router basename='/kestrel'>
            <Switch>
                <Route path={`${ROUTES.SIGN_IN}`}>
                    <Suspense fallback={renderLoader()}>
                        <SignIn />
                    </Suspense>
                </Route>

                <Redirect to={`${ROUTES.SIGN_IN}`} />
            </Switch>
        </Router>
    );
}
