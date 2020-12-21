import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexItem from './FlexItem';

const Container = styled(FlexItem)`
    display: flex;
    flex-direction: row;
    column-gap: ${(props) => props.columnGap};
`;

const propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    columnGap: PropTypes.string,
    flexGrow: PropTypes.number,
    alignContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignSelf: PropTypes.string,
    justifyContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifySelf: PropTypes.string,
};

function FlexRow({
    children,
    style,
    className,
    columnGap = '1rem',
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
            columnGap={columnGap}
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

FlexRow.propTypes = propTypes;
export default FlexRow;
