import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAWSCategoryMedia, useAWSCategories } from '../hooks';
import { TempContainer, FadeBackground } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';

export default function Browse() {
    const { categorySlug } = useParams();
    const { categories } = useAWSCategories();
    const selectedCategory = categorySlug ?? (categories.length ? categories[0] : '');
    const { media, category: mediaCategory } = useAWSCategoryMedia(`${selectedCategory}/`);
    const containerRef = useRef();
    // console.log('Browse: AWS categories', categories);
    // console.log('Browse: AWS media', media);
    // console.log('Browse:', `selectedCategory: ${selectedCategory} mediaCategory: ${mediaCategory}`);

    return (
        <>
            <TempContainer ref={containerRef}>
                <HeaderContainer categories={categories} selectedCategory={selectedCategory} />
                <PosterContainer
                    containerRef={containerRef}
                    media={media}
                    mediaCategory={mediaCategory}
                    selectedCategory={selectedCategory}
                />
            </TempContainer>
            <FadeBackground hue={11.2} base='#182848' split={100} />
        </>
    );
}
