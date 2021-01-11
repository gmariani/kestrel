import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { TimerButtonLink, CreditsPreview, Credits, FlexCol, FlexRow, ButtonLink, EpisodeTitle } from '../components';
import mediaInterface from '../interfaces/media';

const propTypes = {
    media: mediaInterface,
    onStarted: PropTypes.func,
};

function CreditsContainer({ media, onStarted }) {
    const history = useHistory();
    const { isSingle, season, episode, nextEpisode } = media;
    const nextRoute = nextEpisode?.route;
    const isAutoAdvance = true;

    const onClickBack = () => {
        if (onStarted) onStarted();
        history.push(media.route);
    };
    const onClickNext = useCallback(() => {
        if (onStarted) onStarted();
        history.replace(nextRoute);
    }, [onStarted, history, nextRoute]);

    useEffect(() => {
        const timerID = setTimeout(() => {
            if (isAutoAdvance) {
                console.log('Auto-advance onClickNext()');
                onClickNext();
            }
        }, 10 * 1000);
        return () => {
            clearTimeout(timerID);
        };
    }, [isAutoAdvance, onClickNext]);

    return (
        <Credits>
            <FlexCol justifyContent='end' rowGap='2rem'>
                <EpisodeTitle
                    isSingle={isSingle}
                    series={media}
                    seasonNum={season.number}
                    episodeNum={episode.number}
                    episodeName={episode.name}
                />
                <FlexRow columnGap='2rem'>
                    <ButtonLink onClick={onClickBack}>
                        <FaArrowLeft /> Back
                    </ButtonLink>
                    {nextRoute &&
                        (isAutoAdvance ? (
                            <TimerButtonLink onClick={onClickNext} label='Next' />
                        ) : (
                            <ButtonLink onClick={onClickNext}>Next</ButtonLink>
                        ))}
                </FlexRow>
            </FlexCol>
            {/* nextEpisode && (
                <CreditsPreview
                    nextIndex={nextEpisode.index}
                    nextThumbnail={nextEpisode.thumbnail}
                    nextName={nextEpisode.name}
                />
            ) */}
        </Credits>
    );
}

CreditsContainer.propTypes = propTypes;
export default CreditsContainer;
