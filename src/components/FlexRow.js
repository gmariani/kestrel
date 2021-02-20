import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexItem from './FlexItem';

const Container = styled(FlexItem)`
    display: flex;
    flex-direction: row;
    column-gap: ${(props) => props.columnGap};
    /* Safari Fix: Improperly displays height */
    flex-shrink: 0;
`;

const propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    columnGap: PropTypes.string,
    flexGrow: PropTypes.number,
    flexWrap: PropTypes.string,
    alignContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignSelf: PropTypes.string,
    justifyContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifySelf: PropTypes.string,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    innerRef: PropTypes.object,
};

const FlexRow = ({
    children,
    style,
    className,
    columnGap = '1rem',
    flexGrow,
    flexWrap,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    justifyItems,
    justifySelf,
    onClick,
    onClickCapture,
    hasFocusedChild,
    innerRef,
}) => {
    return (
        <Container
            ref={innerRef}
            style={style}
            className={`${className ?? ''} ${hasFocusedChild ? 'focused' : ''}`}
            columnGap={columnGap}
            flexGrow={flexGrow}
            flexWrap={flexWrap}
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
};

FlexRow.propTypes = propTypes;
export default FlexRow;
