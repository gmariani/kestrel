import React from 'react';
import { Container, Title, SubTitle } from './styles/seasons';

export default function Seasons({ children, seasons, selected = 0, ...restProps }) {
    const capitalize = (str) => {
        return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    };
    console.log(seasons);
    return (
        <Container {...restProps}>
            {seasons.map((season, i) => {
                const episodeLabel = season.episodeCount > 1 ? 'Episodes' : 'Episode';
                return (
                    <Title key={i} className={selected === i ? 'selected' : ''}>
                        {capitalize(season.name)}
                        <SubTitle isSelected={selected === i}>
                            {season.episodeCount} {episodeLabel}
                        </SubTitle>
                    </Title>
                );
            })}
        </Container>
    );
}
