import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const LogoText = styled.span`
    font-family: Shrikhand;
    font-style: normal;
    font-weight: normal;
    font-size: 7.5rem;
    line-height: 11rem;
    color: #ffffff;
    mix-blend-mode: normal;
    margin-bottom: -3rem;
`;

export const Image = styled.img``;

export const Link = styled(ReachRouterLink)`
    margin-top: -2.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    transition: all 0.3s;
    &:focus {
        border-radius: 0.5rem;
        border-color: white;
    }
`;
