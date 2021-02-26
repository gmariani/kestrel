import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledInput = styled.input`
    text-transform: uppercase;
    font-size: 4rem;
    padding: 0.5rem;
    font-weight: 400;
    background-color: transparent;
    border: none;
    letter-spacing: 1rem;
    width: 100%;
    color: white;
    &:focus {
        outline: none;
    }
`;

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

const Input = React.forwardRef(({ value, onChange, style }, ref) => {
    return <StyledInput ref={ref} value={value} onChange={onChange} style={style} />;
});

Input.propTypes = propTypes;
export default Input;
