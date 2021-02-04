import React from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';
import { SignIn, Browse, Details, Watch } from './pages';
import * as ROUTES from './constants/routes';
import { useAuthListener } from './hooks';

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
// BUG: Fix spatial navigation errors

export default function App() {
    const { user } = useAuthListener();

    // Setup spatial navigation
    initNavigation({
        // debug: true,
        // visualDebug: true,
    });
    // Optional
    // setKeyMap({
    //     left: 9001,
    //     up: 9002,
    //     right: 9003,
    //     down: 9004,
    //     enter: 9005,
    // });

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

                {/* <Route>
                    <Home />
                </Route> */}

                <Redirect to='/browse' />
            </Switch>
        </Router>
    ) : (
        <Router basename='/kestrel'>
            <Switch>
                <Redirect from={`${ROUTES.SIGN_IN}`} to={`${ROUTES.HOME}`} />

                <Route path={`${ROUTES.HOME}`}>
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    );
}
