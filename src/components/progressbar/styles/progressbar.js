import styled from 'styled-components/macro';

export const Track = styled.div`
    height: 5px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.25);
`;

export const Bar = styled.div`
    height: 5px;
    width: ${({ value }) => `${value}%;`};
    background: white;
`;
