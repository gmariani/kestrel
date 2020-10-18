import React from 'react';
import simpleSvgPlaceholder from '@cloudfour/simple-svg-placeholder';
import { Container, Image, Title, SubTitle, Group } from './styles/poster';

export default function Poster({ posterPath, title, year, genres, to, ...restProps }) {
    // const genreList = genres.map((genre) => genre.name).join(', ');
    const genreList = genres.join(', ');
    // const year = new Date(firstAirDate).getFullYear();

    // If no image exists, show this
    const placeholderPath = simpleSvgPlaceholder({
        bgColor: '#0F1C3F',
        textColor: '#7FDBFF',
        height: 700,
        width: 466,
        text: title,
    });

    console.log(posterPath);
    return (
        <Container to={to} {...restProps}>
            <Image src={posterPath ?? placeholderPath} height='700' width='466' />
            <Title>
                {title}
                <span>({year})</span>
            </Title>
            <SubTitle>{genreList}</SubTitle>
        </Container>
    );
}

Poster.Group = function PosterGroup({ children, ...restProps }) {
    return <Group {...restProps}>{children}</Group>;
};
