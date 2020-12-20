import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Loading, TempContainer, Shadow, ScrimBackground, Row, EpisodeDetail } from '../components';
import { SeasonContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useMedia } from '../hooks';
import * as ROUTES from '../constants/routes';

import { getEpisodeProgress, toSlug } from '../utils';

export default function Details() {
    const history = useHistory();
    const { categorySlug, mediaSlug, seasonSlug } = useParams();

    // function slugToID(slug, data) {
    //     function isMatch(item) {
    //         return this === toSlug(item.name);
    //     }
    //     const match = data.find(isMatch, slug);
    //     return match ? match.docId : null;
    // }

    const media = useMedia(mediaSlug, seasonSlug);
    const { isSingle, docId: mediaId, season, seasons, episode } = media;

    const savedData = JSON.parse(localStorage.getItem(mediaId));
    const [progress, setProgress] = useState(savedData?.progress ?? []);
    const lastPlayedSeasonIndex = savedData?.lastPlayedSeason ?? 0;
    const lastPlayedEpisodeIndex = savedData?.lastPlayedEpisode ?? 0;

    const focusElements = isSingle ? ['details'] : ['details', 'episodes', 'seasons'];
    const [focus, setFocus] = useState(0);
    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            // (27) Esc
            if (keyCode === 27) {
                history.push(`/browse`);
                event.preventDefault();
            }
            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 37) {
                    setFocus((focus - 1 + focusElements.length) % focusElements.length);
                } else if (keyCode === 39) {
                    setFocus((focus + 1) % focusElements.length);
                }
                event.preventDefault();
            }
        },
        [history, focus, setFocus, focusElements.length]
    );
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    // Firebase hasn't replied yet...
    if (!media.loaded) return <Loading visible />;

    // If no season is selected and previous season exists, jump to that
    if (!seasonSlug && lastPlayedSeasonIndex !== undefined) {
        return (
            <Redirect
                to={`/${toSlug(media.category)}/${media.slug}/details/${toSlug(
                    media.seasons[lastPlayedSeasonIndex].name
                )}`}
            />
        );
    }

    // TODO convert saved data from indices to slugs?

    const { episodes } = season;
    const episodeRef = episodes?.[lastPlayedEpisodeIndex] ?? { duration: '0:0', name: '' };
    const episodeProgress = getEpisodeProgress(
        progress?.[lastPlayedSeasonIndex]?.[lastPlayedEpisodeIndex],
        episodeRef.duration
    );
    const episodeRoute = isSingle
        ? `/${categorySlug}/${mediaSlug}/watch`
        : `/${categorySlug}/${mediaSlug}/watch/${toSlug(season.name)}/${toSlug(episodeRef.name)}`;

    return (
        <>
            <TempContainer>
                <HeaderContainer hideMenu />
                <Row height='100%'>
                    {!isSingle ? (
                        <SeasonContainer
                            hasFocus={focusElements[focus] === 'seasons'}
                            seasons={media.seasons}
                            onClickSeason={(seasonIndex) => {
                                history.push(
                                    `/${toSlug(media.category)}/${media.slug}/details/${toSlug(
                                        media.seasons[seasonIndex].name
                                    )}`
                                );
                            }}
                        />
                    ) : null}
                    <EpisodeDetail
                        hasFocus={focusElements[focus] === 'details'}
                        isSingle={isSingle}
                        series={media}
                        season={lastPlayedSeasonIndex}
                        episode={lastPlayedEpisodeIndex}
                        progress={episodeProgress}
                        episodeRoute={episodeRoute}
                        onClickRestart={() => {
                            // Reset episode progress
                            const tempProgress = [...progress];
                            if (!tempProgress[lastPlayedSeasonIndex]) tempProgress[lastPlayedSeasonIndex] = [];
                            tempProgress[lastPlayedSeasonIndex][lastPlayedEpisodeIndex] = 0;
                            localStorage.setItem(
                                mediaId,
                                JSON.stringify({
                                    progress: tempProgress,
                                    lastPlayedSeasonIndex,
                                    lastPlayedEpisodeIndex,
                                })
                            );
                            // Save progress
                            setProgress(tempProgress);
                        }}
                    />
                    {!isSingle ? (
                        <EpisodeContainer
                            hasFocus={focusElements[focus] === 'episodes'}
                            seasonProgress={progress?.[season.index]}
                            episodes={episodes}
                            seasonPath={`/${toSlug(media.category)}/${media.slug}/watch/${season.slug}/`}
                            onClickEpisode={(episodeIndex) => {
                                // Update last played episode
                                localStorage.setItem(
                                    mediaId,
                                    JSON.stringify({
                                        progress,
                                        lastPlayedSeason: season.index,
                                        lastPlayedEpisode: episodeIndex,
                                    })
                                );
                            }}
                        />
                    ) : null}
                </Row>
            </TempContainer>
            <Shadow opacity={0.9} />
            <ScrimBackground hue={media.backgroundHue} imagePath={media.backgroundPath} />
        </>
    );
}
