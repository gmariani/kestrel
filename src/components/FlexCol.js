import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexItem from './FlexItem';

const Container = styled(FlexItem)`
    display: flex;
    flex-direction: column;
    row-gap: ${(props) => props.rowGap};
`;

const propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    rowGap: PropTypes.string,
    flexGrow: PropTypes.number,
    alignContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignSelf: PropTypes.string,
    justifyContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifySelf: PropTypes.string,
};

function FlexCol({
    children,
    style,
    className,
    rowGap = '1rem',
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
            rowGap={rowGap}
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

FlexCol.propTypes = propTypes;
export default FlexCol;
