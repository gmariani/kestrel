import React from 'react';
import { Container, Title, SubTitle } from './styles/seasons';

export default function Seasons({ focusId, focusTarget, seasons, selected = 0, onClickSeason, ...restProps }) {
    const capitalize = (str) => str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    const hasFocus = focusId === focusTarget;

    return (
        <Container {...restProps}>
            {seasons.map((season, i) => {
                const episodeLabel = season.episodeCount > 1 ? 'Episodes' : 'Episode';
                const isSelected = i === selected;
                const classSelected = isSelected ? 'selected' : '';
                const classFocused = isSelected && hasFocus ? 'focused' : '';
                return (
                    <Title key={i} className={`${classSelected} ${classFocused}`} onClick={() => onClickSeason(i)}>
                        {capitalize(season.name)}
                        <SubTitle isSelected={isSelected}>
                            {season.episodeCount} {episodeLabel}
                        </SubTitle>
                    </Title>
                );
            })}
        </Container>
    );
}
