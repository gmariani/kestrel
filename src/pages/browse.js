import React from 'react';
//import { useHistory } from 'react-router-dom';
import { Background, Poster } from '../components';
import { HeaderContainer } from '../containers/header';
//import * as ROUTES from '../constants/routes';
import { useContent } from '../hooks';

export default function Browse() {
    const { content: categories } = useContent('categories', 'order');
    const { content: media } = useContent('media');
    const category = 'TV';

    console.log('categories', categories);
    console.log('media', media);

    const getPosters = (posters, category) => {
        const content = [];
        posters.forEach((poster) => {
            if (category === poster.category) {
                content.push(
                    <Poster
                        key={poster.docId}
                        posterPath={poster.posterPath}
                        title={poster.name}
                        year={poster.year}
                        genres={poster.genres}
                        to={poster.docId}
                    />
                );
            }
        });
        return content;
    };

    return (
        <Background.Browse>
            <HeaderContainer categories={categories} selectedCategory={category} />
            <Poster.Group>{media && getPosters(media, category)}</Poster.Group>
        </Background.Browse>
    );
}
