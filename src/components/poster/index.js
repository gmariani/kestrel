import React from 'react';
import PropTypes from 'prop-types';
import simpleSvgPlaceholder from '@cloudfour/simple-svg-placeholder';
import { Container, Image, Title, SubTitle, Group } from './styles/poster';

const propTypes = {
    posterPath: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    to: PropTypes.string.isRequired,
};

function Poster({ posterPath, title = 'No Title', year = 1900, genres = [], to }) {
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

    return (
        <Container to={to}>
            <Image src={posterPath ?? placeholderPath} height='700' width='466' />
            <Title>
                {title}
                <span>({year})</span>
            </Title>
            <SubTitle>{genreList}</SubTitle>
        </Container>
    );
}

Poster.Group = function PosterGroup({ hasFocus = false, children }) {
    return <Group hasFocus={hasFocus}>{children}</Group>;
};
Poster.Group.propTypes = {
    hasFocus: PropTypes.string,
    children: PropTypes.node,
};

Poster.propTypes = propTypes;
export default Poster;
