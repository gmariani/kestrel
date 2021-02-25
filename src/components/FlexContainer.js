import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;

    ${(props) => props.flexDirection && `flex-direction:${props.flexDirection};`}

    ${(props) => props.flexGrow && `flex-grow:${props.flexGrow};`}
    ${(props) => props.flexWrap && `flex-wrap:${props.flexWrap};`}

    ${(props) => props.alignContent && `align-content:${props.alignContent};`}
    ${(props) => props.justifyContent && `justify-content:${props.justifyContent};`}

    ${(props) => props.alignItems && `align-items:${props.alignItems};`}
    ${(props) => props.justifyItems && `justify-items:${props.justifyItems};`}

    ${(props) => props.alignSelf && `align-self:${props.alignSelf};`}
    ${(props) => props.justifySelf && `justify-self:${props.justifySelf};`}

    /* Safari Fix: It can't handle gap with Flex */
    /*row-gap: ${(props) => props.rowGap};*/
    /*column-gap: ${(props) => props.columnGap};*/
    & > * {
        margin-bottom: ${(props) => props.rowGap ?? 0};
        margin-right: ${(props) => props.columnGap ?? 0};
    }
    & > :last-child {
        margin-right: 0;
    }

    /* Safari Fix: Improperly displays height */
    flex-shrink: 0;
`;

const propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    rowGap: PropTypes.string,
    columnGap: PropTypes.string,
    flexDirection: PropTypes.string,
    flexGrow: PropTypes.number,
    flexWrap: PropTypes.string,
    alignContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignSelf: PropTypes.string,
    justifyContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifySelf: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
};

const FlexItem = React.forwardRef(
    (
        {
            children,
            style,
            className,
            rowGap,
            columnGap,
            flexDirection,
            flexGrow,
            flexWrap,
            alignContent,
            alignItems,
            alignSelf,
            justifyContent,
            justifyItems,
            justifySelf,
            onMouseEnter,
            onClick,
            onClickCapture,
        },
        ref
    ) => {
        return (
            <Container
                ref={ref}
                style={style}
                className={className}
                rowGap={rowGap}
                columnGap={columnGap}
                flexDirection={flexDirection}
                flexGrow={flexGrow}
                flexWrap={flexWrap}
                alignContent={alignContent}
                alignItems={alignItems}
                alignSelf={alignSelf}
                justifyContent={justifyContent}
                justifyItems={justifyItems}
                justifySelf={justifySelf}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                onClickCapture={onClickCapture}>
                {children}
            </Container>
        );
    }
);

FlexItem.propTypes = propTypes;
export default FlexItem;
