import React from 'react';
//import { useHistory } from 'react-router-dom';
import { Background } from '../components';
import { HeaderContainer } from '../containers/header';
//import * as ROUTES from '../constants/routes';
import { useCollections } from '../hooks';
import { useTMDB } from '../hooks';

export default function Browse() {
    const { categories } = useCollections();
    const { tmdb } = useTMDB('tv', 1437);
    const poster_url = tmdb.data ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdb.data.poster_path}` : null;
    const backdrop_url = tmdb.data
        ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${tmdb.data.backdrop_path}`
        : null;

    return (
        <Background.Browse>
            <HeaderContainer categories={categories} />
            {poster_url && <img src={poster_url} alt='test' />}
        </Background.Browse>
    );
}
