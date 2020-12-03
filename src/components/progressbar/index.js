import React from 'react';
import PropTypes from 'prop-types';
import { Track, Bar } from './styles/progressbar';

const propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    value: PropTypes.number,
    theme: PropTypes.string,
    onClick: PropTypes.func,
};

const defaultProps = {
    width: '100%',
    height: '5px',
    value: 0,
    theme: 'light',
    onClick: null,
};

function ProgressBar({ width, height, value, theme, onClick }) {
    return (
        <Track width={width} height={height} theme={theme} onClick={onClick}>
            <Bar value={value} height={height} theme={theme} />
        </Track>
    );
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;
export default ProgressBar;
