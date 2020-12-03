import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, SubTitle } from './styles/seasons';

const propTypes = {
    focusId: PropTypes.number.isRequired,
    focusTarget: PropTypes.number.isRequired,
    seasons: PropTypes.arrayOf(
        PropTypes.shape({
            episodeCount: PropTypes.number,
            episodes: PropTypes.arrayOf(PropTypes.object),
            slug: PropTypes.string,
            tmdb: PropTypes.number,
            year: PropTypes.number,
        })
    ).isRequired,
    selected: PropTypes.number,
    onClickSeason: PropTypes.func,
};

const defaultProps = {
    selected: 0,
    onClickSeason: null,
};

function Seasons({ focusId, focusTarget, seasons, selected, onClickSeason }) {
    const capitalize = (str) => str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    const hasFocus = focusId === focusTarget;

    return (
        <Container>
            {seasons.map((season, i) => {
                const episodeLabel = season.episodeCount > 1 ? 'Episodes' : 'Episode';
                const isSelected = i === selected;
                const classSelected = isSelected ? 'selected' : '';
                const classFocused = isSelected && hasFocus ? 'focused' : '';
                return (
                    // Will not be sorted, or added to dynamically so it's safe to use array index
                    // eslint-disable-next-line react/no-array-index-key
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

Seasons.propTypes = propTypes;
Seasons.defaultProps = defaultProps;
export default Seasons;
