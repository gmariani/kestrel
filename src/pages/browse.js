import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAWSCategoryMedia, useAWSCategories } from '../hooks';
import { DefaultContainer, FadeBackground } from '../components';
import { HeaderContainer, PosterContainer } from '../containers';

const Container = styled(DefaultContainer)`
    padding-top: 2.25rem;
    padding-bottom: 0 !important;
    padding-left: 4.25rem;
    padding-right: 4.25rem;
`;

export default function Browse() {
    const { categorySlug } = useParams();
    const { categories } = useAWSCategories();
    const selectedCategory = categorySlug ?? (categories.length ? categories[0] : '');
    const { media, category: mediaCategory } = useAWSCategoryMedia(`${selectedCategory}/`);

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
