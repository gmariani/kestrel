import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexCol from './FlexCol';
import FadeBackground from './FadeBackground';

const Container = styled(FlexCol)`
    padding: 4rem;
    width: 50%;
    position: relative;
`;

const Content = styled.div`
    position: relative;
    z-index: 5;
    color: white;
`;

const propTypes = {
    children: PropTypes.node,
    backgroundHue: PropTypes.number,
    backgroundPath: PropTypes.string,
};

function HalfPane({ children, backgroundHue, backgroundPath }) {
    return (
        <Container>
            <Content>{children}</Content>
            <FadeBackground hue={backgroundHue} base='hsl(var(--hue), 50%, 40%)' imagePath={backgroundPath} />
        </Container>
    );
}

HalfPane.propTypes = propTypes;
export default HalfPane;
