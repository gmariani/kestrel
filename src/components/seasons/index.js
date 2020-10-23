import React from 'react';
import { Container, Title, Bar } from './styles/seasons';

export default function Seasons({ children, seasons, selected = 0, ...restProps }) {
    const capitalize = (str) => {
        return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    };

    return (
        <Container {...restProps}>
            {seasons.map((season, i) => {
                return (
                    <Seasons.Title key={i} isSelected={selected === i}>
                        {capitalize(season.name)}
                    </Seasons.Title>
                );
            })}
            <Bar />
        </Container>
    );
}

Seasons.Title = function SeasonTitle({ children, isSelected = false, ...restProps }) {
    return (
        <Title className={isSelected ? 'selected' : ''} {...restProps}>
            <div>{children}</div>
        </Title>
    );
};
