import styled from 'styled-components/macro';

export const LoginForm = styled.form`
    text-align: center;
`;
export const Title = styled.h2`
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 3rem;
    line-height: 54px;
    color: #ffffff;
    text-align: center;
    pointer-events: none;
    user-select: none;
`;
export const InputGroup = styled.div`
    display: flex;
    column-gap: 10px;
    margin-bottom: 5rem;
`;
export const InputLetter = styled.input`
    font-family: Tw Cen MT;
    background-color: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px solid white;
    width: 3rem;
    color: white;
    font-size: 2.5rem;
    text-align: center;
    transition: all 0.3s;
    &:active,
    &:focus {
        width: 3.5rem;
        border-bottom-width: 4px;
        border-top: none;
        border-right: none;
        border-right: none;
    }
`;
