import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Background, Row, Detail, Seasons, Episodes, ProgressBar } from '../components';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';
import { HeaderContainer } from '../containers/header';
import { focusNext, toSlug, padNumber } from '../utils';

export default function Details() {
    const { content: media } = useContent('media');
    const { mediaId } = useParams();

    const findMeta = (media, mediaId) => {
        return media.filter((poster) => {
            return mediaId === poster.docId;
        });
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

    const foundMeta = findMeta(media, mediaId);
    const item = foundMeta.length ? foundMeta[0] : null;
    const currentSeason = 0;
    const currentEpisode = 0;
    const episodes = item ? item.seasons[currentSeason].episodes : [];

    // TODO clean up loading
    return !item ? (
        <div>Loading...</div>
    ) : (
        <Background
            hasShadow={true}
            opacityShadow={0.9}
            hasColor={false}
            hasImage={true}
            imagePath={item.backgroundPath}
            opacity={1}
            onKeyDown={onKeyDown.bind(this)}>
            <HeaderContainer />
            <Row>
                <Seasons seasons={item.seasons} selected={currentSeason} />
                <Detail>
                    <Detail.Meta>
                        {item.year} · {item.genres.join(', ')}
                    </Detail.Meta>
                    <Detail.Title>{item.name}</Detail.Title>
                    <Detail.Description>{item.description}</Detail.Description>
                    <ProgressBar value={50} />
                    <Detail.Controls>
                        <Button btnStyle='primary'>Watch</Button>
                        <Button btnStyle='secondary'>Restart</Button>
                    </Detail.Controls>
                </Detail>
                <Episodes>
                    <Episodes.Fade />
                    {episodes.map((episode, i) => {
                        console.log(episode);
                        const episodeIndex = padNumber(i + 1);
                        const isSelected = currentEpisode === i ? 1 : 0;
                        return (
                            <Episodes.Episode
                                key={i}
                                isSelected={isSelected}
                                index={episodeIndex}
                                data={episode}
                                to={`${ROUTES.WATCH}${mediaId}/${currentSeason}/${toSlug(episode.name)}`}
                            />
                        );
                    })}
                </Episodes>
            </Row>
        </Background>
    );
}
