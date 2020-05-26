import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './app.scss';
import Home from '../../routes/home';
import About from '../../routes/about';
import Player from '../../routes/player';

export default function App() {
    return (
        <Router>
            <div className={styles.app}>
                <nav className={styles.nav}>
                    <div className={styles.container}>
                        <ul className={styles.nav__container}>
                            <li className={styles.nav__item}>
                                <Link className={styles.nav__link} to='/'>
                                    Home
                                </Link>
                            </li>
                            <li className={styles.nav__item}>
                                <Link className={styles.nav__link} to='/about'>
                                    About
                                </Link>
                            </li>
                            <li className={styles.nav__item}>
                                <Link className={styles.nav__link} to='/player'>
                                    Player
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path='/about'>
                        <About />
                    </Route>
                    <Route path='/player'>
                        <Player />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
