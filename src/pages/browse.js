import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../hooks';
import { Background } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';
import { toSlug } from '../utils';

export default function Browse() {
    // HOOKS //
    const { content: categories } = useContent('categories', 'order');
    const { content: media } = useContent('media');
    const params = useParams();

    // Variables //
    const selectedCategory = params.categoryId ?? (categories.length ? categories[0].slug : '');

    // Background theme
    // TODO use https://codepen.io/meodai/pen/RerqjG
    const getColor = () => {
        const themes = [
            ['hsla(11,83%,62%,1)', 'hsla(11,100%,50%,1)'], // red
            ['hsla(214,55%,50%,1)', 'hsla(214,36%,37%,1)'], // blue
        ];
        // return themes[Math.floor(Math.random() * 2)];
        return themes[1];
        // const start = Math.floor(Math.random() * 255);
        // const end = Math.floor(Math.random() * 255);
        // return [`hsla(${start},83%,62%,1)`, `hsla(${start},100%,50%,1)`];
    };
    const themeColor = getColor();

    // Key listener
    const focusElements = ['header', 'posters'];
    const [focus, setFocus] = useState(0);
    useEffect(() => {
        const onKeyDown = (event) => {
            const { keyCode } = event;
            if (keyCode >= 37 && keyCode <= 41) {
                // (38) Up Arrow, (40) Down Arrow
                if (keyCode === 38) {
                    setFocus((focus - 1 + focusElements.length) % focusElements.length);
                } else if (keyCode === 40) {
                    setFocus((focus + 1) % focusElements.length);
                }
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [focus, setFocus, focusElements.length]);

    return (
        <Background
            hasShadow
            hasColor
            blendMode='lighten'
            opacity={0.5}
            startColor={themeColor[0]}
            endColor={themeColor[1]}
            tabIndex='0'>
            <HeaderContainer
                hasFocus={focusElements[focus] === 'header'}
                categories={categories}
                selectedCategory={selectedCategory}
            />
            <PosterContainer
                hasFocus={focusElements[focus] === 'posters'}
                posters={media.filter((poster) => selectedCategory === toSlug(poster.category))}
            />
        </Background>
    );
}
