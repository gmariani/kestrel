import React, { useState } from 'react';
import { Container, Title, SubTitle } from './styles/seasons';

export default function Seasons({ focusId, focusTarget, seasons, selected = 0, onClickSeason, ...restProps }) {
    const capitalize = (str) => {
        return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    };

    const hasFocus = focusId === focusTarget;
    const [focus, setFocus] = useState(selected);
    const onKeyDown = (event) => {
        // Only take action if we have focus
        if (!hasFocus) return;

        console.log('onKeyDown Seasons', event);
        switch (event.key) {
            case 'Down': // IE/Edge specific value
            case 'ArrowDown':
                setFocus((focus + 1) % seasons.length);
                break;
            case 'Up': // IE/Edge specific value
            case 'ArrowUp':
                setFocus((focus - 1 + seasons.length) % seasons.length);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    };

    return (
        <Container onKeyDown={onKeyDown.bind(this)} {...restProps}>
            {seasons.map((season, i) => {
                const episodeLabel = season.episodeCount > 1 ? 'Episodes' : 'Episode';
                return (
                    <Title
                        key={i}
                        className={focus === i ? 'selected' : ''}
                        onClick={(e) => {
                            onClickSeason(i);
                        }}>
                        {capitalize(season.name)}
                        <SubTitle isSelected={focus === i}>
                            {season.episodeCount} {episodeLabel}
                        </SubTitle>
                    </Title>
                );
            })}
        </Container>
    );
}
