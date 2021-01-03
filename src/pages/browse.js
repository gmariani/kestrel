import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAWSCategoryMedia, useAWSCategories } from '../hooks';
import { TempContainer, FadeBackground } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';

export default function Browse() {
    const { categorySlug } = useParams();
    const { categories } = useAWSCategories();
    const selectedCategory = categorySlug ?? (categories.length ? categories[0] : '');
    const { media, category: mediaCategory } = useAWSCategoryMedia(`${selectedCategory}/`);
    // console.log('Browse: AWS categories', categories);
    // console.log('Browse: AWS media', media);
    // console.log('Browse:', `selectedCategory: ${selectedCategory} mediaCategory: ${mediaCategory}`);

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
                    media={media}
                    mediaCategory={mediaCategory}
                    selectedCategory={selectedCategory}
                />
            </TempContainer>
            <FadeBackground hue={11.2} base='#182848' split={100} />
        </>
    );
}
