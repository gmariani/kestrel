import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import simpleSvgPlaceholder from '@cloudfour/simple-svg-placeholder';

const Container = styled(ReachRouterLink)`
    max-width: 466px;
    transition: all 0.2s ease-in-out;
    &:focus,
    &.focused.selected,
    &:hover {
        text-decoration: none;
        transform: scale(1.05);
    }
`;

const Image = styled.img`
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    margin-bottom: 0.5rem;
`;

const Title = styled.h2`
    font-style: normal;
    font-weight: bold;
    font-size: 2.1875rem;
    line-height: 38px;

    color: #ffffff;
    & span {
        margin-left: 10px;
        font-weight: 400;
    }
`;

const SubTitle = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 1.5625rem;
    line-height: 27px;

    color: #ffffff;
`;

const propTypes = {
    imagePath: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
};

function Poster({ imagePath, to, title = 'No Title', year = 1900, genres = [], className = '' }) {
    // If no image exists, show this
    const placeholderPath = simpleSvgPlaceholder({
        bgColor: '#0F1C3F',
        textColor: '#7FDBFF',
        height: 700,
        width: 466,
        text: title,
    });

    return (
        <Container to={to} className={className}>
            <Image src={imagePath ?? placeholderPath} height='700' width='466' />
            <Title>
                {title}
                <span>({year})</span>
            </Title>
            <SubTitle>{genres.join(', ')}</SubTitle>
        </Container>
    );
}

Poster.propTypes = propTypes;
export default Poster;
