import React from 'react';
import { Container, Image, Title, SubTitle } from './styles/poster';

export default function Poster({ posterPath, title, firstAirDate, genres, to, ...restProps }) {
    const genreList = genres.map((genre) => genre.name).join(', ');
    const year = new Date(firstAirDate).getFullYear();
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
