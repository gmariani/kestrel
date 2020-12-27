import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent, useAWSCategories } from '../hooks';
import { TempContainer, Shadow, FadeBackground } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';
import { toSlug } from '../utils';

export default function Browse() {
    // HOOKS //
    const { content: categories } = useContent('categories', 'order');
    const { content: media } = useContent('media');
    const awsCategories = useAWSCategories();
    console.log('Browse awsCategories', awsCategories);
    const params = useParams();

    // Variables //
    const selectedCategory = params.categorySlug ?? (categories.length ? categories[0].slug : '');

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
                    selectedCategory={selectedCategory}
                    posters={media.filter((series) => selectedCategory === toSlug(series.category))}
                />
            </TempContainer>
            {/* <Shadow /> */}
            <FadeBackground hue={11.2} base='#182848' split={100} />
        </>
    );
}
