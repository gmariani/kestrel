import styled from 'styled-components/macro';

export const Track = styled.div`
    height: 5px;
    width: 100%;
    background-color: #c4c4c4;
`;

export const Bar = styled.div`
    height: 5px;
    width: ${({ value }) => `${value}%;`};
    background: linear-gradient(90deg, #3b79c7 0%, #3d5b81 100%);
`;
