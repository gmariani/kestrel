import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Track = styled.div`
    height: var(--height);
    width: 100%;
    background-color: var(--trackBG);
    cursor: var(--usePointer);
    flex: 1;
`;

const Progress = styled.div`
    width: var(--width);
    height: 100%;
    min-height: var(--height);
    pointer-events: none;
    background: var(--progressBG);
`;

const propTypes = {
    height: PropTypes.number,
    value: PropTypes.number,
    usePointer: PropTypes.bool,
    onClick: PropTypes.func,
};

const ProgressBar = ({ height = 5, value = 0, usePointer = true, onClick }) => {
    return (
        <Track
            style={{
                '--height': `${height}px`,
                '--width': `${value}%`,
                '--usePointer': usePointer ? 'pointer' : 'default',
            }}
            onClick={onClick}>
            <Progress />
        </Track>
    );
};

ProgressBar.propTypes = propTypes;
export default ProgressBar;
