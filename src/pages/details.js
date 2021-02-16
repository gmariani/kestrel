import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
// import throttle from 'lodash/throttle';
import { Loading, TempContainer, Shadow, ScrimBackground, FlexRow, EpisodeDetail } from '../components';
import { SeasonContainer, ExtraContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useMedia, useLocalStorage } from '../hooks';
import { getEpisodeProgress, toSlug, getAWSBaseURL } from '../utils';

const Container = styled(TempContainer)`
    height: 100%;
    padding-top: 2.25rem;
    padding-bottom: 2.25rem;
`;

const Row = styled(FlexRow)`
    overflow: hidden;
`;

const propTypes = {
    navigateByDirection: PropTypes.func,
    setFocus: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
};

function Details({ navigateByDirection, setFocus, hasFocusedChild }) {
    const history = useHistory();
    const { categorySlug, mediaSlug, seasonSlug } = useParams();
    const media = useMedia(categorySlug, mediaSlug, seasonSlug);
    const { isSingle, season } = media;
    const baseURL = getAWSBaseURL();
    const keyPrefix = `${categorySlug}/${mediaSlug}`;

    // Get previous played history, if no history select first episode of first season
    const [playHistory, setPlayHistory] = useLocalStorage(media.id, {
        progress: [[0]],
        lastSeasonIndex: 0,
        lastEpisodeIndex: 0,
    });
    let { lastSeasonIndex, lastEpisodeIndex } = playHistory;
    const { progress } = playHistory;

    useEffect(() => {
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

        // TODO: lodash throttle
        // https://github.com/NoriginMedia/react-spatial-navigation/blob/master/src/App.js
        // function onWheelHandler(event) {
        //     event.preventDefault();
        //     const { deltaY, deltaX } = event;

        //     if (deltaY > 1) {
        //         navigateByDirection('down');
        //     } else if (deltaY < 0) {
        //         navigateByDirection('up');
        //     } else if (deltaX > 1) {
        //         navigateByDirection('right');
        //     } else if (deltaX < 1) {
        //         navigateByDirection('left');
        //     }
        // }
        // const throttledWheelHandler = throttle(onWheelHandler, 500, { trailing: false });
        // function onWheel(event) {
        //     throttledWheelHandler(event);
        // }

        document.addEventListener('wheel', onWheel, false);
        return () => {
            document.removeEventListener('wheel', onWheel, false);
        };
    });

    useEffect(() => {
        function onKeyDown(event) {
            const { key } = event;
            // keyCode: 27 / key: Escape
            if (key === 'Escape') {
                event.preventDefault();
                history.push('/');
            }
        }

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    });

    // On render, listen for tv remote to navigate as well
    useEffect(() => {
        function onKeyDown(event) {
            const { key } = event;

            switch (key) {
                case 'ColorF2Yellow':
                    event.preventDefault();
                    navigateByDirection('up');
                    break;
                case 'ColorF3Blue':
                    event.preventDefault();
                    navigateByDirection('down');
                    break;
                case 'ColorF0Red':
                    event.preventDefault();
                    navigateByDirection('left');
                    break;
                case 'ColorF1Green':
                    event.preventDefault();
                    navigateByDirection('right');
                    break;
                default:
                // Do nothing
            }
        }

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
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
        console.log('Redirect to', `/${keyPrefix}/${toSlug(media.seasons[lastSeasonIndex].name)}`);
        return <Redirect to={`/${keyPrefix}/${toSlug(media.seasons[lastSeasonIndex].name)}`} />;
    }

    function getEpisodeContainer() {
        if (isSingle) {
            if (media.extras && media.extras.length > 0) {
                // Remove movie from progress array before sending
                return (
                    <ExtraContainer
                        episodes={media.extras}
                        extraProgress={progress[0].slice(1)}
                        routePrefix={`/${keyPrefix}/extras/`}
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
                routePrefix={`/${keyPrefix}/${season.slug}/`}
            />
        );
    }

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
        ? `/${keyPrefix}/watch`
        : `/${keyPrefix}/${toSlug(season.name)}/${toSlug(startEpisode.name)}/watch`;

    const rawBackgroundURL = media.season.backgroundURL ?? media.backgroundURL;
    const backgroundURL =
        rawBackgroundURL && !rawBackgroundURL.includes(mediaSlug)
            ? `${baseURL}/${keyPrefix}/${rawBackgroundURL}`
            : rawBackgroundURL;

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
                                    `/${keyPrefix}/${toSlug(media.seasons[seasonIndex].name)}`
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
            <ScrimBackground hue={media.backgroundHue} imagePath={backgroundURL} />
        </>
    );
}

Details.propTypes = propTypes;
export default withFocusable({ trackChildren: true })(Details);
