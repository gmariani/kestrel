import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    font-size: 2rem;
    color: white;
    flex-direction: column;
    justify-content: end;
    flex: 1;
`;
export const Meta = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const Title = styled.div`
    font-size: 8rem;
    line-height: 8rem;
    margin-bottom: 1rem;
`;
export const Description = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.5rem;
`;
export const Controls = styled.div`
    display: flex;
    column-gap: 2rem;
    margin-top: 2rem;
`;
