import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Track = styled.div`
    height: ${({ height }) => `${height}px;`};
    width: 100%;
    background-color: var(--trackBG);
    cursor: pointer;
    flex: 1;
`;

const Progress = styled.div`
    height: 100%;
    pointer-events: none;
    background: var(--progressBG);
`;

const propTypes = {
    height: PropTypes.number,
    value: PropTypes.number,
    theme: PropTypes.string,
    onClick: PropTypes.func,
    innerRef: PropTypes.shape({
        current: PropTypes.node,
    }),
};

const ProgressBar = React.forwardRef(({ height = 5, value = 0, theme = 'light', onClick }, ref) => {
    const bgColor = theme === 'dark' ? 'rgba(0,0,0, 0.6)' : 'rgba(255,255,255, 0.6)';
    const bgColor2 = theme === 'dark' ? 'rgba(0,0,0, 0.25)' : 'rgba(255,255,255, 0.25)';

    return (
        <Track
            ref={ref}
            height={height}
            theme={theme}
            onClick={onClick}
            style={{ '--progressBG': bgColor, '--trackBG': bgColor2 }}>
            <Progress style={{ width: `${value}%` }} />
        </Track>
    );
});

ProgressBar.propTypes = propTypes;
export default ProgressBar;
