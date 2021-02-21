import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import GridItem from './GridItem';

const Container = styled(GridItem)`
    grid-column-gap: ${(props) => props.columnGap};

    ${(props) => props.gridAutoColumns && `grid-auto-columns:${props.gridAutoColumns};`}
    ${(props) => props.gridColumnEnd && `grid-column-end:${props.gridColumnEnd};`}
    ${(props) => props.gridColumnStart && `grid-column-start:${props.gridColumnStart};`}
    ${(props) => props.gridColumn && `grid-column:${props.gridColumn};`}
    ${(props) => props.gridTemplateColumns && `grid-template-columns:${props.gridTemplateColumns};`}
`;

const propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    columnGap: PropTypes.string,
    gridArea: PropTypes.string,
    gridAutoFlow: PropTypes.string,
    gridTemplateAreas: PropTypes.string,
    gridTemplate: PropTypes.string,
    gridAutoColumns: PropTypes.string,
    gridColumnEnd: PropTypes.string,
    gridColumnStart: PropTypes.string,
    gridColumn: PropTypes.string,
    gridTemplateColumns: PropTypes.string,
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

function GridCol({
    children,
    style,
    className,
    columnGap = '1rem',
    gridArea,
    gridAutoFlow,
    gridTemplateAreas,
    gridTemplate,
    gridAutoColumns,
    gridColumnEnd,
    gridColumnStart,
    gridColumn,
    gridTemplateColumns,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    justifyItems,
    justifySelf,
    onMouseEnter,
    onClick,
    onClickCapture,
}) {
    return (
        <Container
            style={style}
            className={className}
            columnGap={columnGap}
            gridArea={gridArea}
            gridAutoFlow={gridAutoFlow}
            gridTemplateAreas={gridTemplateAreas}
            gridTemplate={gridTemplate}
            gridAutoColumns={gridAutoColumns}
            gridColumnEnd={gridColumnEnd}
            gridColumnStart={gridColumnStart}
            gridColumn={gridColumn}
            gridTemplateColumns={gridTemplateColumns}
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

GridCol.propTypes = propTypes;
export default GridCol;
