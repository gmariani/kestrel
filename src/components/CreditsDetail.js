import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    row-gap: 2rem;
`;

const propTypes = {
    children: PropTypes.node,
};

function CreditsDetail({ children }) {
    return <Container>{children}</Container>;
}

CreditsDetail.propTypes = propTypes;
export default CreditsDetail;
