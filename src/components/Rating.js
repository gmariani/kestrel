import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { ReactComponent as SvgNC17 } from '../images/rated-nc-17.svg';
import { ReactComponent as SvgR } from '../images/rated-r.svg';
import { ReactComponent as SvgPG13 } from '../images/rated-pg-13.svg';
import { ReactComponent as SvgPG } from '../images/rated-pg.svg';
import { ReactComponent as SvgG } from '../images/rated-g.svg';
import { ReactComponent as SvgTVMA } from '../images/tv-rated-ma.svg';
import { ReactComponent as SvgTV14 } from '../images/tv-rated-14.svg';
import { ReactComponent as SvgTVPG } from '../images/tv-rated-pg.svg';
import { ReactComponent as SvgTVG } from '../images/tv-rated-g.svg';
import { ReactComponent as SvgTVY7 } from '../images/tv-rated-y7.svg';
import { ReactComponent as SvgTVY } from '../images/tv-rated-y.svg';

const Container = styled.span`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    & svg {
        fill: white;
        height: 25px;
    }
`;

const propTypes = {
    rating: PropTypes.string,
};

function getSVG(rating) {
    switch (rating.toLowerCase()) {
        case 'nc-17':
            return <SvgNC17 />;
        case 'r':
            return <SvgR />;
        case 'pg-13':
            return <SvgPG13 />;
        case 'pg':
            return <SvgPG />;
        case 'g':
            return <SvgG />;
        case 'tv-ma':
            return <SvgTVMA />;
        case 'tv-14':
            return <SvgTV14 />;
        case 'tv-pg':
            return <SvgTVPG />;
        case 'tv-g':
            return <SvgTVG />;
        case 'tv-y7':
            return <SvgTVY7 />;
        case 'tv-y':
            return <SvgTVY />;
        default:
            // nr
            return null;
    }
}

function Rating({ rating = 'NR' }) {
    const svg = getSVG(rating);
    return svg && <Container>{svg}</Container>;
}

Rating.propTypes = propTypes;
export default Rating;
