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
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    flexGrow: PropTypes.number,
    alignContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignSelf: PropTypes.string,
    justifyContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifySelf: PropTypes.string,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
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
    onClick,
    onClickCapture,
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
            justifySelf={justifySelf}
            onClick={onClick}
            onClickCapture={onClickCapture}>
            {children}
        </Container>
    );
}

FlexItem.propTypes = propTypes;
export default FlexItem;
