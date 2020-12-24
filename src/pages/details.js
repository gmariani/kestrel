import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Loading, TempContainer, Shadow, ScrimBackground, FlexRow, EpisodeDetail } from '../components';
import { SeasonContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useMedia, useLocalStorage, useFocus } from '../hooks';
import { getEpisodeProgress, toSlug } from '../utils';

export default function Details() {
    const history = useHistory();
    const { categorySlug, mediaSlug, seasonSlug } = useParams();
    const media = useMedia(mediaSlug, seasonSlug);
    const { isSingle, season } = media;

    // Get previous played history, if no history select first episode of first season
    const [playHistory, setPlayHistory] = useLocalStorage(media.id, {
        progress: [[0]],
        lastSeasonIndex: 0,
        lastEpisodeIndex: 0,
    });
    const { lastSeasonIndex, lastEpisodeIndex, progress } = playHistory;

    // Manage focused element
    const SEASONS_ELEMENT = 'seasons';
    const DETAILS_ELEMENT = 'details';
    const EPISODES_ELEMENT = 'episodes';
    const focusElements = [DETAILS_ELEMENT];
    if (!isSingle) focusElements.push(EPISODES_ELEMENT);
    if (!isSingle && media.seasons.length > 1) focusElements.push(SEASONS_ELEMENT);
    const [focusElement, focusKey] = useFocus(focusElements, 'horizontal');

    // If Firebase hasn't replied yet, show loading screen
    if (!media.loaded) return <Loading visible />;

    // If no season is selected and previous season exists, redirect to that
    if (media.seasons && seasonSlug === undefined && lastSeasonIndex !== undefined) {
        return (
            <Redirect
                to={`/${toSlug(media.category)}/${media.slug}/details/${toSlug(media.seasons[lastSeasonIndex].name)}`}
            />
        );
    }

    // Go back to the browse screen
    if (focusKey === 'Escape') {
        return <Redirect to='/browse' />;
    }

    // Get start (last/initial) episode meta
    const startEpisode = isSingle ? media : media?.seasons[lastSeasonIndex]?.episodes?.[lastEpisodeIndex];
    const startEpisodeProgress = getEpisodeProgress(
        progress?.[lastSeasonIndex]?.[lastEpisodeIndex],
        startEpisode.duration
    );
    const startEpisodeRoute = isSingle
        ? `/${categorySlug}/${mediaSlug}/watch`
        : `/${categorySlug}/${mediaSlug}/watch/${toSlug(season.name)}/${toSlug(startEpisode.name)}`;

    return (
        <>
            <TempContainer>
                <HeaderContainer hideMenu />
                <FlexRow style={{ height: '100%' }} columnGap='2rem'>
                    {!isSingle && media.seasons.length > 1 && (
                        <SeasonContainer
                            hasFocus={focusElement === SEASONS_ELEMENT}
                            seasons={media.seasons}
                            onClick={(seasonIndex) => {
                                history.replace(
                                    // prettier-ignore
                                    `/${toSlug(media.category)}/${media.slug}/details/${toSlug(media.seasons[seasonIndex].name)}`
                                );
                            }}
                        />
                    )}
                    <EpisodeDetail
                        hasFocus={focusElement === DETAILS_ELEMENT}
                        isSingle={isSingle}
                        media={media}
                        startSeasonIndex={lastSeasonIndex}
                        startEpisodeIndex={lastEpisodeIndex}
                        startEpisodeProgress={startEpisodeProgress}
                        startEpisodeRoute={startEpisodeRoute}
                        onClickWatch={() => {
                            history.push(startEpisodeRoute);
                        }}
                        onClickRestart={(navigate) => {
                            // If season array doesn't exist yet, create it
                            if (!progress[lastSeasonIndex]) progress[lastSeasonIndex] = [];
                            // Reset episode progress
                            progress[lastSeasonIndex][lastEpisodeIndex] = 0;
                            setPlayHistory({
                                progress,
                                lastSeasonIndex,
                                lastEpisodeIndex,
                            });

                            if (navigate) history.push(startEpisodeRoute);
                        }}
                    />
                    {!isSingle && (
                        <EpisodeContainer
                            hasFocus={focusElement === EPISODES_ELEMENT}
                            lastEpisodeIndex={lastSeasonIndex === season.index ? lastEpisodeIndex : null}
                            tmdbId={media?.tmdb}
                            episodes={season.episodes}
                            seasonNumber={season.number}
                            seasonProgress={progress?.[season.index]}
                            routePrefix={`/${toSlug(media.category)}/${media.slug}/watch/${season.slug}/`}
                        />
                    )}
                </FlexRow>
            </TempContainer>
            <Shadow opacity={0.9} />
            <ScrimBackground hue={media.backgroundHue} imagePath={media.season.background ?? media.backgroundPath} />
        </>
    );
}
