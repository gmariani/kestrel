import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Track = styled.div`
    height: ${({ height }) => `${height};`};
    width: ${({ width }) => `${width};`};
    background-color: ${({ theme }) => (theme === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)')};
    cursor: pointer;
    flex: 1;
`;

const Bar = styled.div`
    height: ${({ height }) => `${height};`};
    width: ${({ value }) => `${value}%;`};
    background: ${({ theme }) => (theme === 'dark' ? 'black' : 'white')};
`;

const propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    value: PropTypes.number,
    theme: PropTypes.string,
    onClick: PropTypes.func,
};

function ProgressBar({ width = '100%', height = '5px', value = 0, theme = 'light', onClick }) {
    return (
        <Track width={width} height={height} theme={theme} onClick={onClick}>
            <Bar value={value} height={height} theme={theme} />
        </Track>
    );
}

ProgressBar.propTypes = propTypes;
export default ProgressBar;
