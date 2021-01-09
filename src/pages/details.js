import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import PropTypes from 'prop-types';
import { Loading, TempContainer, Shadow, ScrimBackground, FlexRow, EpisodeDetail } from '../components';
import { SeasonContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useMedia, useLocalStorage } from '../hooks';
import { getEpisodeProgress, toSlug } from '../utils';

const propTypes = {
    navigateByDirection: PropTypes.func,
    setFocus: PropTypes.func,
    focused: PropTypes.bool,
    hasFocusedChild: PropTypes.bool,
};
function Details({ navigateByDirection, setFocus, focused, hasFocusedChild }) {
    const history = useHistory();
    const { categorySlug, mediaSlug, seasonSlug } = useParams();
    const media = useMedia(categorySlug, mediaSlug, seasonSlug);
    const { isSingle, season } = media;

    // Get previous played history, if no history select first episode of first season
    const [playHistory, setPlayHistory] = useLocalStorage(media.id, {
        progress: [[0]],
        lastSeasonIndex: 0,
        lastEpisodeIndex: 0,
    });
    let { lastSeasonIndex, lastEpisodeIndex } = playHistory;
    const { progress } = playHistory;

    useEffect(() => {
        // TODO: lodash throttle
        // https://github.com/NoriginMedia/react-spatial-navigation/blob/master/src/App.js

        function onWheel(event) {
            event.preventDefault();
            const { deltaY, deltaX } = event;

            if (deltaY > 1) {
                navigateByDirection('down');
            } else if (deltaY < 0) {
                navigateByDirection('up');
            } else if (deltaX > 1) {
                navigateByDirection('right');
            } else if (deltaX < 1) {
                navigateByDirection('left');
            }
        }

        document.addEventListener('wheel', onWheel, false);
        return () => {
            document.removeEventListener('wheel', onWheel, false);
        };
    });

    useEffect(() => {
        console.log('Details.setFocus ACTION-PLAY', hasFocusedChild, focused);
        if (!hasFocusedChild) setFocus('ACTION-PLAY');
    });

    // If Firebase hasn't replied yet, show loading screen
    if (!media.loaded) return <Loading visible />;

    // If no season is selected and previous season exists, redirect to that
    if (media.seasons && seasonSlug === undefined && lastSeasonIndex !== undefined) {
        console.log(
            'Redirect to',
            `/${toSlug(media.category)}/${media.slug}/details/${toSlug(media.seasons[lastSeasonIndex].name)}`
        );
        return (
            <Redirect
                to={`/${toSlug(media.category)}/${media.slug}/details/${toSlug(media.seasons[lastSeasonIndex].name)}`}
            />
        );
    }

    // Go back to the browse screen
    // if (focusKey === 'Escape') {
    //     return <Redirect to='/browse' />;
    // }

    // Get start (last/initial) episode meta
    // console.log(media.id, playHistory);
    if (media.seasons && media?.seasons[lastSeasonIndex] === undefined) lastSeasonIndex = 0;
    if (media.seasons && media?.seasons[lastSeasonIndex]?.episodes?.[lastEpisodeIndex] === undefined)
        lastEpisodeIndex = 0;
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
                            lastEpisodeIndex={lastSeasonIndex === season.index ? lastEpisodeIndex : null}
                            tmdbId={media.tmdb}
                            episodes={season.episodes}
                            seasonNumber={season.number}
                            seasonProgress={progress?.[season.index]}
                            routePrefix={`/${toSlug(media.category)}/${media.slug}/watch/${season.slug}/`}
                        />
                    )}
                </FlexRow>
            </TempContainer>
            <Shadow opacity={0.9} />
            <ScrimBackground hue={media.backgroundHue} imagePath={media.season.backgroundURL ?? media.backgroundURL} />
        </>
    );
}

Details.propTypes = propTypes;
export default withFocusable({ trackChildren: true })(Details);
