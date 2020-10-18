import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Container = styled(ReachRouterLink)`
    max-width: 466px;
`;
export const Image = styled.img`
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
`;
export const Title = styled.h2`
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: bold;
    font-size: 2.1875rem;
    line-height: 38px;

    color: #ffffff;
    & span {
        margin-left: 10px;
        font-weight: 400;
    }
`;
export const SubTitle = styled.p`
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 1.5625rem;
    line-height: 27px;

    color: #ffffff;
`;
