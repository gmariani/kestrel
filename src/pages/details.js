import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TempContainer, Shadow, ScrimBackground, Row, EpisodeDetail } from '../components';
import { SeasonContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';

import { getEpisodeProgress, toSlug, getSeries } from '../utils';

export default function Details() {
    const { content: media } = useContent('media');
    const history = useHistory();
    const { mediaId } = useParams();
    const savedData = JSON.parse(localStorage.getItem(mediaId));
    const [progress, setProgress] = useState(savedData?.progress ?? []);
    const lastPlayedSeason = savedData?.lastPlayedSeason ?? 0;
    const lastPlayedEpisode = savedData?.lastPlayedEpisode ?? 0;
    const [selectedSeason, setSelectedSeason] = useState(lastPlayedSeason);
    // const [selectedEpisode, setSelectedEpisode] = useState(lastPlayedEpisode);
    const series = getSeries(media, mediaId);

    const isSingle = series && series.filePath;
    const focusElements = isSingle ? ['details'] : ['details', 'episodes', 'seasons'];
    const [focus, setFocus] = useState(0);
    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            // (27) Esc
            if (keyCode === 27) {
                history.push(`${ROUTES.BROWSE}`);
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
    if (!series) return <div>Loading...</div>;
    // if (!loaded) return <Player.Buffer visible={true} />;

    const episodes = series.seasons ? series.seasons[selectedSeason].episodes : [series];
    const episode = episodes?.[lastPlayedEpisode];
    const episodeProgress = episode
        ? getEpisodeProgress(progress?.[lastPlayedSeason]?.[lastPlayedEpisode], episode.duration)
        : 0;
    const episodeRoute = episode ? `${ROUTES.WATCH}${mediaId}/${lastPlayedSeason}/${toSlug(episode.name)}` : null;

    return (
        <>
            <TempContainer>
                <HeaderContainer hideMenu />
                <Row height='100%'>
                    {!isSingle ? (
                        <SeasonContainer
                            hasFocus={focusElements[focus] === 'seasons'}
                            seasons={series.seasons}
                            onClickSeason={(seasonIndex) => {
                                setSelectedSeason(seasonIndex);
                            }}
                        />
                    ) : null}
                    <EpisodeDetail
                        hasFocus={focusElements[focus] === 'details'}
                        isSingle={isSingle}
                        series={series}
                        season={lastPlayedSeason}
                        episode={lastPlayedEpisode}
                        progress={episodeProgress}
                        episodeRoute={episodeRoute}
                        onClickRestart={() => {
                            // Reset episode progress
                            const tempProgress = [...progress];
                            if (!tempProgress[lastPlayedSeason]) tempProgress[lastPlayedSeason] = [];
                            tempProgress[lastPlayedSeason][lastPlayedEpisode] = 0;
                            localStorage.setItem(
                                mediaId,
                                JSON.stringify({
                                    progress: tempProgress,
                                    lastPlayedSeason,
                                    lastPlayedEpisode,
                                })
                            );
                            // Save progress
                            setProgress(tempProgress);
                        }}
                    />
                    {!isSingle ? (
                        <EpisodeContainer
                            hasFocus={focusElements[focus] === 'episodes'}
                            seasonProgress={progress?.[selectedSeason]}
                            episodes={episodes}
                            seasonPath={`${ROUTES.WATCH}${mediaId}/${selectedSeason}/`}
                            onClickEpisode={(episodeIndex) => {
                                // Update last played episode
                                localStorage.setItem(
                                    mediaId,
                                    JSON.stringify({
                                        progress,
                                        lastPlayedSeason: selectedSeason,
                                        lastPlayedEpisode: episodeIndex,
                                    })
                                );
                            }}
                        />
                    ) : null}
                </Row>
            </TempContainer>
            <Shadow opacity={0.9} />
            <ScrimBackground imagePath={series.backgroundPath} />
        </>
    );
}
