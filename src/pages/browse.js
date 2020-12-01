import React, { useState } from 'react';
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
    const category = params.categoryId ?? (categories.length ? categories[0].slug : '');
    const getColor = () => {
        const themes = [
            ['hsla(11,83%,62%,1)', 'hsla(11,100%,50%,1)'], // red
            ['hsla(214,55%,50%,1)', 'hsla(214,36%,37%,1)'], // blue
        ];
        return themes[Math.floor(Math.random() * 2)];
        // const start = Math.floor(Math.random() * 255);
        // const end = Math.floor(Math.random() * 255);
        // return [`hsla(${start},83%,62%,1)`, `hsla(${start},100%,50%,1)`];
    };

    const themeColor = getColor();

    const focusElements = ['header', 'posters'];
    const [focus, setFocus] = useState(0);
    const onKeyDown = (event) => {
        console.log('Browse.onKeyDown');
        const keyCode = event.which || event.keyCode;
        if (keyCode >= 37 && keyCode <= 41) {
            // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
            if (37 === keyCode) {
                //
            } else if (38 === keyCode) {
                setFocus((focus - 1) % focusElements.length);
            } else if (39 === keyCode) {
                //
            } else if (40 === keyCode) {
                setFocus((focus + 1) % focusElements.length);
            }
            event.preventDefault();
        }
    };

    return (
        <Background
            hasShadow={true}
            hasColor={true}
            blendMode='lighten'
            opacity={0.5}
            startColor={themeColor[0]}
            endColor={themeColor[1]}
            onKeyDown={onKeyDown}>
            <HeaderContainer
                hasFocus={'header' === focusElements[focus]}
                categories={categories}
                selectedCategory={category}
            />
            <Poster.Group hasFocus={'posters' === focusElements[focus]}>
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
        </Background>
    );
}
