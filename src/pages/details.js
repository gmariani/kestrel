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
        progress: [],
        lastSeasonIndex: 0,
        lastEpisodeIndex: 0,
    });
    const { lastSeasonIndex, lastEpisodeIndex, progress } = playHistory;

    // Manage focused element
    const SEASONS_ELEMENT = 'seasons';
    const DETAILS_ELEMENT = 'details';
    const EPISODES_ELEMENT = 'episodes';
    const focusElements = isSingle ? [DETAILS_ELEMENT] : [DETAILS_ELEMENT, EPISODES_ELEMENT, SEASONS_ELEMENT];
    const [focusElement, focusKey] = useFocus(focusElements, 'horizontal');

    // If Firebase hasn't replied yet, show loading screen
    if (!media.loaded) return <Loading visible />;

    // If no season is selected and previous season exists, redirect to that
    if (seasonSlug === undefined && lastSeasonIndex !== undefined) {
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

    // Get last/initial episode meta
    const lastEpisode = !isSingle ? media?.seasons[lastSeasonIndex]?.episodes?.[lastEpisodeIndex] : null;
    const lastEpisodeProgress = lastEpisode
        ? getEpisodeProgress(progress?.[lastSeasonIndex]?.[lastEpisodeIndex], lastEpisode.duration)
        : null;
    function getLastRoute() {
        if (lastEpisode) {
            return isSingle
                ? `/${categorySlug}/${mediaSlug}/watch`
                : `/${categorySlug}/${mediaSlug}/watch/${toSlug(season.name)}/${toSlug(lastEpisode.name)}`;
        }
        return null;
    }
    const lastEpisodeRoute = getLastRoute(isSingle, lastEpisode);

    return (
        <>
            <TempContainer>
                <HeaderContainer hideMenu />
                <FlexRow style={{ height: '100%' }} columnGap='2rem'>
                    {!isSingle && (
                        <SeasonContainer
                            hasFocus={focusElement === SEASONS_ELEMENT}
                            seasons={media.seasons}
                            onClickSeason={(seasonIndex) => {
                                history.replace(
                                    `/${toSlug(media.category)}/${media.slug}/details/${toSlug(
                                        media.seasons[seasonIndex].name
                                    )}`
                                );
                            }}
                        />
                    )}
                    <EpisodeDetail
                        hasFocus={focusElement === DETAILS_ELEMENT}
                        isSingle={isSingle}
                        media={media}
                        lastSeasonIndex={lastSeasonIndex}
                        lastEpisodeIndex={lastEpisodeIndex}
                        lastEpisodeProgress={lastEpisodeProgress}
                        lastEpisodeRoute={lastEpisodeRoute}
                        onClickRestart={() => {
                            // Copy progress
                            const tempProgress = [...progress];
                            // If season array doesn't exist yet, create it
                            if (!tempProgress[lastSeasonIndex]) tempProgress[lastSeasonIndex] = [];
                            // Reset episode progress
                            tempProgress[lastSeasonIndex][lastEpisodeIndex] = 0;
                            setPlayHistory({
                                progress: tempProgress,
                                lastSeasonIndex,
                                lastEpisodeIndex,
                            });
                        }}
                    />
                    {!isSingle && (
                        <EpisodeContainer
                            hasFocus={focusElement === EPISODES_ELEMENT}
                            lastEpisodeIndex={lastSeasonIndex === season.index ? lastEpisodeIndex : null}
                            episodes={season.episodes}
                            seasonProgress={progress?.[season.index]}
                            routePrefix={`/${toSlug(media.category)}/${media.slug}/watch/${season.slug}/`}
                        />
                    )}
                </FlexRow>
            </TempContainer>
            <Shadow opacity={0.9} />
            <ScrimBackground hue={media.backgroundHue} imagePath={media.backgroundPath} />
        </>
    );
}
