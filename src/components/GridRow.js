import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import GridItem from './GridItem';

const Container = styled(GridItem)`
    grid-row-gap: ${(props) => props.rowGap};

    ${(props) => props.gridAutoRows && `grid-auto-rows:${props.gridAutoRows};`}
    ${(props) => props.gridRowEnd && `grid-row-end:${props.gridRowEnd};`}
    ${(props) => props.gridRowStart && `grid-row-start:${props.gridRowStart};`}
    ${(props) => props.gridRow && `grid-row:${props.gridRow};`}
    ${(props) => props.gridTemplateRows && `grid-template-rows:${props.gridTemplateRows};`}
`;

const propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    rowGap: PropTypes.string,
    gridArea: PropTypes.string,
    gridAutoFlow: PropTypes.string,
    gridTemplateAreas: PropTypes.string,
    gridTemplate: PropTypes.string,
    gridAutoRows: PropTypes.string,
    gridRowEnd: PropTypes.string,
    gridRowStart: PropTypes.string,
    gridRow: PropTypes.string,
    gridTemplateRows: PropTypes.string,
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

const GridRow = ({
    children,
    style,
    className,
    rowGap = '1rem',
    gridArea,
    gridAutoFlow,
    gridTemplateAreas,
    gridTemplate,
    gridAutoRows,
    gridRowEnd,
    gridRowStart,
    gridRow,
    gridTemplateRows,
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
            rowGap={rowGap}
            gridArea={gridArea}
            gridAutoFlow={gridAutoFlow}
            gridTemplateAreas={gridTemplateAreas}
            gridTemplate={gridTemplate}
            gridAutoRows={gridAutoRows}
            gridRowEnd={gridRowEnd}
            gridRowStart={gridRowStart}
            gridRow={gridRow}
            gridTemplateRows={gridTemplateRows}
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

GridRow.propTypes = propTypes;
export default GridRow;
