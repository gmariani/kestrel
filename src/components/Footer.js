import React from 'react';
import styled from 'styled-components/macro';
import Logo from './Logo';

const Container = styled.div`
    position: absolute;
    bottom: 55px;
    right: 100px;
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const Version = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 1.25rem;
    line-height: 1.375rem;
    color: #ffffff;
`;

function Footer() {
    return (
        <Container>
            <Logo />
            <Version>Mariani 2020 - 1.0.0</Version>
        </Container>
    );
}
export default Footer;
