import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: grid;
    grid-row-gap: ${(props) => props.gridRowGap};
    grid-column-gap: ${(props) => props.gridColumnGap};

    ${(props) => props.gridArea && `grid-area:${props.gridArea};`}
    ${(props) => props.gridAutoFlow && `grid-auto-flow:${props.gridAutoFlow};`}
    ${(props) => props.gridTemplateAreas && `grid-template-areas:${props.gridTemplateAreas};`}
    ${(props) => props.gridTemplate && `grid-template:${props.gridTemplate};`}

    ${(props) => props.alignContent && `align-content:${props.alignContent};`}
    ${(props) => props.justifyContent && `justify-content:${props.justifyContent};`}

    ${(props) => props.alignItems && `align-items:${props.alignItems};`}
    ${(props) => props.justifyItems && `justify-items:${props.justifyItems};`}

    ${(props) => props.alignSelf && `align-self:${props.alignSelf};`}
    ${(props) => props.justifySelf && `justify-self:${props.justifySelf};`}

    ${(props) => props.gridAutoRows && `grid-auto-rows:${props.gridAutoRows};`}
    ${(props) => props.gridRowEnd && `grid-row-end:${props.gridRowEnd};`}
    ${(props) => props.gridRowStart && `grid-row-start:${props.gridRowStart};`}
    ${(props) => props.gridRow && `grid-row:${props.gridRow};`}
    ${(props) => props.gridTemplateRows && `grid-template-rows:${props.gridTemplateRows};`}

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
    gridArea: PropTypes.string,
    gridAutoFlow: PropTypes.string,
    gridTemplateAreas: PropTypes.string,
    gridTemplate: PropTypes.string,

    gridColumnGap: PropTypes.string,
    gridAutoColumns: PropTypes.string,
    gridColumnEnd: PropTypes.string,
    gridColumnStart: PropTypes.string,
    gridColumn: PropTypes.string,
    gridTemplateColumns: PropTypes.string,

    gridRowGap: PropTypes.string,
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
    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
};

const GridContainer = React.forwardRef(
    (
        {
            children,
            style,
            className,
            gridArea,
            gridAutoFlow,
            gridTemplateAreas,
            gridTemplate,

            gridColumnGap,
            gridAutoColumns,
            gridColumnEnd,
            gridColumnStart,
            gridColumn,
            gridTemplateColumns,

            gridRowGap,
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
                gridArea={gridArea}
                gridAutoFlow={gridAutoFlow}
                gridTemplateAreas={gridTemplateAreas}
                gridTemplate={gridTemplate}
                gridRowGap={gridRowGap}
                gridAutoRows={gridAutoRows}
                gridRowEnd={gridRowEnd}
                gridRowStart={gridRowStart}
                gridRow={gridRow}
                gridTemplateRows={gridTemplateRows}
                gridColumnGap={gridColumnGap}
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
);

GridContainer.propTypes = propTypes;
export default GridContainer;
