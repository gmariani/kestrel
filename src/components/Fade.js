import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50.25%, #000000 92.79%);
    bottom: 0;
    height: 200px;
    right: 0;
    pointer-events: none;
    position: absolute;
    width: 50%;
    z-index: 10;
`;

function Fade() {
    return <Container />;
}

export default Fade;
