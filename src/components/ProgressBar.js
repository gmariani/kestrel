import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Track = styled.div`
    height: ${({ height }) => `${height}px;`};
    width: 100%;
    background-color: var(--trackBG);
    cursor: ${({ usePointer }) => (usePointer ? 'pointer' : 'default')};
    flex: 1;
`;

const Progress = styled.div`
    width: ${({ width }) => `${width}%;`};
    height: 100%;
    min-height: ${({ height }) => `${height}px;`};
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
        <Track height={height} onClick={onClick} usePointer={usePointer}>
            <Progress height={height} width={value} />
        </Track>
    );
};

ProgressBar.propTypes = propTypes;
export default ProgressBar;
