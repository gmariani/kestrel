import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Background, Row, EpisodeDetail } from '../components';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';
// import { HeaderContainer } from '../containers';
import { getEpisodeProgress, toSlug, getSeries } from '../utils';

export default function DetailsMovie() {
    const { content: media } = useContent('media');
    const { mediaId } = useParams();
    const savedData = JSON.parse(localStorage.getItem(mediaId));
    const [progress, setProgress] = useState(savedData?.progress ?? []);
    const [focus, setFocus] = useState(2);
    const series = getSeries(media, mediaId);

    const backgroundRef = useRef();
    useEffect(() => {
        // Once loaded, set focus
        if (backgroundRef.current) backgroundRef.current.focus();
    }, [series, backgroundRef]);

    // console.log('savedData', mediaId, savedData);
    // console.log('progress', progress, selectedSeason, selectedEpisode);

    // Firebase hasn't replied yet...
    if (!series) return <div>Loading...</div>;
    // if (!loaded) return <Player.Buffer visible={true} />;

    const episode = series;
    const episodeSlug = toSlug(episode.name);
    const episodeProgress = getEpisodeProgress(progress, episode.duration);
    const hasProgress = episodeProgress.percent > 0;
    const focusItems = hasProgress ? ['seasons', 'detail-continue', 'detail-restart'] : ['seasons', 'detail-continue'];

    const onKeyDown = (event) => {
        // event.stopPropagation();

        console.log('onKeyDown Row - current focus', focusItems[focus]);
        switch (event.key) {
            case 'Left': // IE/Edge specific value
            case 'ArrowLeft':
                event.preventDefault();
                setFocus((focus - 1 + focusItems.length) % focusItems.length);
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                event.preventDefault();
                setFocus((focus + 1) % focusItems.length);
                break;
            case 'Enter':
                // Do something for "enter" or "return" key press.
                break;
            case 'Esc': // IE/Edge specific value
            case 'Escape':
                // Do something for "esc" key press.
                break;
            default:
            // Quit when this doesn't handle the key event.
        }
    };

    return (
        <Background
            ref={backgroundRef}
            onLoad={(e) => e.target.focus()}
            onKeyDown={(e) => onKeyDown(e)}
            tabIndex='0'
            hasShadow
            opacityShadow={0.9}
            hasColor={false}
            hasImage
            imagePath={series.backgroundPath}
            opacity={1}>
            {/* <HeaderContainer /> */}
            <Row height='100%'>
                <EpisodeDetail
                    focusId={hasProgress ? [1, 2] : [1]}
                    focusTarget={focus}
                    series={series}
                    episodeProgress={hasProgress ? episodeProgress : null}
                    episodeRoute={`${ROUTES.WATCH}${mediaId}/${episodeSlug}`}
                    onClickRestart={() => {
                        // Reset episode progress
                        localStorage.setItem(
                            mediaId,
                            JSON.stringify({
                                progress: 0,
                            })
                        );
                        // Save progress
                        setProgress(0);
                    }}
                />
            </Row>
        </Background>
    );
}
