import React from 'react';
import { Container, Controls, Meta, Title, Description } from './styles/detail';

export default function Detail({ children, ...restProps }) {
    return <Container>{children}</Container>;
}
Detail.Info = function DetailInfo({ series, ...restProps }) {
    return (
        <>
            <Meta>
                {series.year} · {series.genres.join(', ')}
            </Meta>
            <Title>{series.name}</Title>
            <Description>{series.description}</Description>
        </>
    );
};
Detail.Controls = function DetailControls({ children, ...restProps }) {
    return <Controls {...restProps}>{children}</Controls>;
};
