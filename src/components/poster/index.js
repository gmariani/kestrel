import React from 'react';
import { Container, Image, Title, SubTitle, Group } from './styles/poster';

export default function Poster({ posterPath, title, year, genres, to, ...restProps }) {
    // const genreList = genres.map((genre) => genre.name).join(', ');
    const genreList = genres.join(', ');
    // const year = new Date(firstAirDate).getFullYear();
    return (
        <Container to={`/watch/${to}`} {...restProps}>
            <Image src={posterPath} height='700' width='466' alt={title} />
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
