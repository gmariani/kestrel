import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexCol from './FlexCol';
import FadeBackground from './FadeBackground';

const Container = styled(FlexCol)`
    padding: 7rem 5rem 5rem 5rem;
    width: 50%;
    position: relative;
`;

const Content = styled.div`
    position: relative;
    z-index: 5;
    color: white;
    font-size: 1.5rem;
    pointer-events: auto;
    flex: 1;
`;

const propTypes = {
    children: PropTypes.node,
    backgroundHue: PropTypes.number,
    backgroundPath: PropTypes.string,
};

function HalfPane({ children, backgroundHue, backgroundPath }) {
    return (
        <Container
            onClick={(e) => {
                // Only if they click the background
                if (e.currentTarget.className.includes('HalfPane__Container')) e.stopPropagation();
            }}>
            <Content>{children}</Content>
            <FadeBackground
                hue={backgroundHue}
                base='hsl(var(--hue), 50%, 40%)'
                imagePath={backgroundPath}
                split={40}
            />
        </Container>
    );
}

HalfPane.propTypes = propTypes;
export default HalfPane;
