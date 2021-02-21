import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: grid;

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

const GridItem = React.forwardRef(
    (
        {
            children,
            style,
            className,
            gridArea,
            gridAutoFlow,
            gridTemplateAreas,
            gridTemplate,
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

GridItem.propTypes = propTypes;
export default GridItem;
