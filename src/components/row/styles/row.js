import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    height: ${({ height }) => height};
    column-gap: 2rem;
`;
export default Container;
