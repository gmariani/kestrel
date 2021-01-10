import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAWSCategoryMedia, useAWSCategories } from '../hooks';
import { TempContainer, FadeBackground } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';

const Container = styled(TempContainer)`
    padding-bottom: 0 !important;
`;

export default function Browse() {
    const { categorySlug } = useParams();
    const { categories } = useAWSCategories();
    const selectedCategory = categorySlug ?? (categories.length ? categories[0] : '');
    const { media, category: mediaCategory } = useAWSCategoryMedia(`${selectedCategory}/`);

    // console.log('Browse: AWS categories', categories);
    // console.log('Browse: AWS media', media);
    // console.log('Browse:', `selectedCategory: ${selectedCategory} mediaCategory: ${mediaCategory}`);

    return (
        <>
            <Container>
                <HeaderContainer categories={categories} selectedCategory={selectedCategory} />
                <PosterContainer media={media} mediaCategory={mediaCategory} selectedCategory={selectedCategory} />
            </Container>
            <FadeBackground hue={11.2} base='#182848' split={100} />
        </>
    );
}
