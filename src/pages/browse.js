import React from 'react';
import { useParams } from 'react-router-dom';
import { Background, Poster } from '../components';
import { HeaderContainer } from '../containers/header';
import * as ROUTES from '../constants/routes';
import { useContent } from '../hooks';
import { toSlug } from '../utils';

export default function Browse() {
    const { content: categories } = useContent('categories', 'order');
    const { content: media } = useContent('media');
    const params = useParams();
    const category = params.category ?? (categories.length ? categories[0].slug : '');

    return (
        <Background.Browse>
            <HeaderContainer categories={categories} selectedCategory={category} />
            <Poster.Group>
                {media.map((poster, i) => {
                    return category === toSlug(poster.category) ? (
                        <Poster
                            key={poster.docId}
                            posterPath={poster.posterPath}
                            title={poster.name}
                            year={poster.year}
                            genres={poster.genres}
                            to={`${ROUTES.DETAILS}${poster.docId}`}
                        />
                    ) : null;
                })}
            </Poster.Group>
        </Background.Browse>
    );
}
