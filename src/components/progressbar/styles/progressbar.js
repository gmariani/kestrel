import styled from 'styled-components/macro';

export const Track = styled.div`
    height: ${({ height }) => `${height};`};
    width: ${({ width }) => `${width}%;`};
    background-color: ${({ theme }) => (theme === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)')};
    cursor: pointer;
`;

export const Bar = styled.div`
    height: ${({ height }) => `${height};`};
    width: ${({ value }) => `${value}%;`};
    background: ${({ theme }) => (theme === 'dark' ? 'black' : 'white')};
`;
