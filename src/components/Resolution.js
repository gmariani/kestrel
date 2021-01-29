import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Icon = styled.div`
    border: 2px solid white;
    border-radius: 3px;
    background: none;
    padding: 0px 5px;
    text-transform: uppercase;
    display: inline;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    pointer-events: none;
    user-select: none;
    margin-right: 0.5rem;
`;

const propTypes = {
    type: PropTypes.string,
};

function Resolution({ type = 'sd' }) {
    switch (type) {
        case 'hd':
        case 'uhd':
        case 'sd':
            return <Icon>{type}</Icon>;
        default:
            return null;
    }
}

Resolution.propTypes = propTypes;
export default Resolution;
