import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.form`
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    direction: ltr;
`;

const Error = styled.div`
    background: #e82e03;
    border-radius: 4px;
    font-size: 1.25rem;
    margin: 0 0 16px;
    color: white;
    padding: 15px 20px;
`;

const Title = styled.h2`
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

function SignInForm({ children, onSubmit }) {
    return (
        <Container onSubmit={onSubmit} method='POST'>
            {children}
        </Container>
    );
}
SignInForm.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

SignInForm.Title = function FormTitle({ children }) {
    return <Title>{children}</Title>;
};
SignInForm.Title.propTypes = {
    children: PropTypes.node.isRequired,
};

SignInForm.Error = function FormError({ children }) {
    return <Error>{children}</Error>;
};
SignInForm.Error.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SignInForm;
