import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
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
    backgroundURL: PropTypes.string,
    setFocus: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
    initialFocus: PropTypes.string,
};

function HalfPaneContainer({ children, backgroundHue, backgroundURL, setFocus, hasFocusedChild, initialFocus }) {
    useEffect(() => {
        // Set initial focus inorder to jumpstart spacial navigation
        if (!hasFocusedChild && initialFocus) setFocus(initialFocus);
    }, [hasFocusedChild, setFocus, initialFocus]);

    return (
        <Container
            onClick={(e) => {
                // Only if they click the background
                if (e.currentTarget.className.includes('HalfPane__Container')) e.stopPropagation();
            }}>
            <Content>{children}</Content>
            <FadeBackground hue={backgroundHue} base='hsl(var(--hue), 50%, 40%)' imagePath={backgroundURL} split={40} />
        </Container>
    );
}

HalfPaneContainer.propTypes = propTypes;
const HalfPane = withFocusable({
    trackChildren: true,
    blockNavigationOut: true,
})(HalfPaneContainer);
export default HalfPane;
