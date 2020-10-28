import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    height: ${({ height = 'auto' }) => height};
    column-gap: 2rem;
`;
