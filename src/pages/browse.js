import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../hooks';
import { TempContainer, Shadow, ScrimBackground } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';
import { toSlug } from '../utils';

export default function Browse() {
    // HOOKS //
    const { content: categories } = useContent('categories', 'order');
    const { content: media } = useContent('media');
    const params = useParams();

    // Variables //
    const selectedCategory = params.categoryId ?? (categories.length ? categories[0].slug : '');

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
        <>
            <TempContainer>
                <HeaderContainer
                    hasFocus={focusElements[focus] === 'header'}
                    categories={categories}
                    selectedCategory={selectedCategory}
                />
                <PosterContainer
                    hasFocus={focusElements[focus] === 'posters'}
                    posters={media.filter((poster) => selectedCategory === toSlug(poster.category))}
                />
            </TempContainer>
            <Shadow />
            <ScrimBackground />
        </>
    );
}
