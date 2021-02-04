import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Loading, TempContainer, Shadow, ScrimBackground, FlexRow, EpisodeDetail } from '../components';
import { SeasonContainer, ExtraContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useMedia, useLocalStorage } from '../hooks';
import { getEpisodeProgress, toSlug } from '../utils';

const Container = styled(TempContainer)`
    height: 100%;
    padding: 2.25rem;
`;

const Row = styled(FlexRow)`
    overflow: hidden;
`;

const propTypes = {
    navigateByDirection: PropTypes.func,
    setFocus: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
};

// If meta.json is incomplete, populate from TMDB
// TODO: Maybe do this on the details page?
// if (metadata.loaded && metadata.data.tmdb) {
//     if (!metadata.data.name || !metadata.data.year || !metadata.data.genres) {
//         // const tmdbData = getTMDB(meta.data.tmdb);
//         // meta.data.name = '';
//         // meta.data.year = 0;
//         // meta.data.genres = [];
//         // setMeta(meta.data);
//     }
// }

function Details({ navigateByDirection, setFocus, hasFocusedChild }) {
    const history = useHistory();
    const { categorySlug, mediaSlug, seasonSlug } = useParams();
    const media = useMedia(categorySlug, mediaSlug, seasonSlug);
    const { isSingle, season } = media;
    console.log('isSingle', isSingle);
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
        // Set initial focus inorder to jumpstart spacial navigation
        if (!hasFocusedChild) setFocus('ACTION-PLAY');
    });

    // If Firebase hasn't replied yet, show loading screen
    if (!media.loaded) return <Loading visible />;

    // If no season is selected and previous season exists, redirect to that
    if (media.seasons && seasonSlug === undefined && lastSeasonIndex !== undefined) {
        // eslint-disable-next-line no-console
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

    function getEpisodeContainer() {
        if (isSingle) {
            if (media.extras && media.extras.length > 0) {
                // Remove movie from progress array before sending
                return (
                    <ExtraContainer
                        episodes={media.extras}
                        extraProgress={progress[0].slice(1)}
                        routePrefix={`/${toSlug(media.category)}/${media.slug}/watch/extras/`}
                    />
                );
            }
            return null;
        }
        return (
            <EpisodeContainer
                lastEpisodeIndex={lastSeasonIndex === season.index ? lastEpisodeIndex : null}
                tmdbId={media.tmdb}
                episodes={season.episodes}
                seasonNumber={season.number}
                seasonProgress={progress?.[season.index]}
                routePrefix={`/${toSlug(media.category)}/${media.slug}/watch/${season.slug}/`}
            />
        );
    }

    // TODO set escape to go back
    // Go back to the browse screen
    // if (focusKey === 'Escape') {
    //     return <Redirect to='/browse' />;
    // }

    // Get start (last/initial) episode meta
    // console.log(media.id, playHistory);
    if (media.seasons && media?.seasons[lastSeasonIndex] === undefined) lastSeasonIndex = 0;
    if ((media.seasons && media?.seasons[lastSeasonIndex]?.episodes?.[lastEpisodeIndex] === undefined) || isSingle)
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
            <Container>
                <HeaderContainer hideMenu />
                <Row style={{ height: '100%' }} columnGap='2rem'>
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
                    {getEpisodeContainer()}
                </Row>
            </Container>
            <Shadow opacity={0.75} />
            <ScrimBackground hue={media.backgroundHue} imagePath={media.season.backgroundURL ?? media.backgroundURL} />
        </>
    );
}

Details.propTypes = propTypes;
export default withFocusable({ trackChildren: true })(Details);
