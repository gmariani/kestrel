import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;

    ${(props) => props.flexGrow && `flex-grow:${props.flexGrow};`}

    ${(props) => props.alignContent && `align-content:${props.alignContent};`}
    ${(props) => props.justifyContent && `justify-content:${props.justifyContent};`}

    ${(props) => props.alignItems && `align-items:${props.alignItems};`}
    ${(props) => props.justifyItems && `justify-items:${props.justifyItems};`}

    ${(props) => props.alignSelf && `align-self:${props.alignSelf};`}
    ${(props) => props.justifySelf && `justify-self:${props.justifySelf};`}
`;

const propTypes = {
    children: PropTypes.node,
    style: PropTypes.string,
    className: PropTypes.string,
    flexGrow: PropTypes.number,
    alignContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignSelf: PropTypes.string,
    justifyContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifySelf: PropTypes.string,
};

function FlexItem({
    children,
    style,
    className,
    flexGrow,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    justifyItems,
    justifySelf,
}) {
    return (
        <Container
            style={style}
            className={className}
            flexGrow={flexGrow}
            alignContent={alignContent}
            alignItems={alignItems}
            alignSelf={alignSelf}
            justifyContent={justifyContent}
            justifyItems={justifyItems}
            justifySelf={justifySelf}>
            {children}
        </Container>
    );
}

FlexItem.propTypes = propTypes;
export default FlexItem;
