import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Background, Row, Detail, Seasons, Episodes, ProgressBar } from '../components';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';
import { HeaderContainer } from '../containers/header';
import { focusNext, getEpisodeProgress, getUUID, toSlug } from '../utils';

export default function Details() {
    const { content: media } = useContent('media');
    const { mediaId } = useParams();

    const getSeries = (media, mediaId) => {
        const foundMetadata = media.filter((metadata) => {
            return mediaId === metadata.docId;
        });
        return foundMetadata.length ? foundMetadata[0] : null;
    };

    // TODO
    const onKeyDown = (event) => {
        console.log('onKeyDown', event);
        switch (event.key) {
            case 'Down': // IE/Edge specific value
            case 'ArrowDown':
                //
                break;
            case 'Up': // IE/Edge specific value
            case 'ArrowUp':
                // Do something for "up arrow" key press.
                break;
            case 'Left': // IE/Edge specific value
            case 'ArrowLeft':
                // Do something for "left arrow" key press.
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                // Do something for "right arrow" key press.
                focusNext();
                break;
            case 'Enter':
                // Do something for "enter" or "return" key press.
                break;
            case 'Esc': // IE/Edge specific value
            case 'Escape':
                // Do something for "esc" key press.
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    };

    const series = getSeries(media, mediaId);
    if (!series) return <div>Loading...</div>;

    // TODO make these dynamic
    const selectedSeason = 0;
    const seasonUUID = getUUID(mediaId, selectedSeason);
    const selectedEpisode = +(localStorage.getItem(seasonUUID) || 0);
    const episodes = series ? series.seasons[selectedSeason].episodes : [];
    const episode = episodes[selectedEpisode];
    const episodeSlug = toSlug(episode.name);
    const episodeUUID = getUUID(mediaId, selectedSeason, episodeSlug);
    const episodeProgress = getEpisodeProgress(episodeUUID, episode.duration);
    const hasProgress = episodeProgress.percent > 0;

    return (
        <Background
            hasShadow={true}
            opacityShadow={0.9}
            hasColor={false}
            hasImage={true}
            imagePath={series.backgroundPath}
            opacity={1}
            onKeyDown={onKeyDown.bind(this)}>
            <HeaderContainer />
            <Row height='100%'>
                <Seasons seasons={series.seasons} selected={selectedSeason} />
                <Detail>
                    <Detail.Info series={series} />
                    {hasProgress ? <ProgressBar value={episodeProgress.percent} /> : null}
                    <Detail.Controls>
                        <Button.Link theme='primary' to={`${ROUTES.WATCH}${mediaId}/${selectedSeason}/${episodeSlug}`}>
                            {hasProgress ? 'Continue' : 'Watch'}
                        </Button.Link>
                        {hasProgress ? (
                            <Button.Link
                                theme='secondary'
                                onClick={(e) => {
                                    localStorage.removeItem(episodeUUID);
                                }}
                                to={`${ROUTES.WATCH}${mediaId}/${selectedSeason}/${episodeSlug}`}>
                                Restart
                            </Button.Link>
                        ) : null}
                    </Detail.Controls>
                </Detail>
                <Episodes
                    episodes={episodes}
                    selectedSeries={mediaId}
                    selectedSeason={selectedSeason}
                    selectedEpisode={selectedEpisode}
                    onClickEpisode={(episodeIndex) => {
                        localStorage.setItem(seasonUUID, episodeIndex);
                    }}
                />
            </Row>
        </Background>
    );
}
