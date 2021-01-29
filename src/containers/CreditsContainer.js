import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { TimerButtonLink, Credits, FlexCol, FlexRow, ButtonLink, EpisodeTitle } from '../components';
import mediaInterface from '../interfaces/media';
import { useLocalStorage } from '../hooks';

const propTypes = {
    media: mediaInterface,
    onStarted: PropTypes.func,
};

function CreditsContainer({ media, onStarted }) {
    const history = useHistory();
    const { isSingle, /* season, episode, */ nextEpisode } = media;
    const nextRoute = nextEpisode?.route;
    const [settings] = useLocalStorage('settings', {
        subtitles: true,
        autoplay: true,
    });

    const onClickBack = useCallback(() => {
        if (onStarted) onStarted();
        history.push(media.route);
    }, [onStarted, history, media]);

    const onClickNext = useCallback(() => {
        if (onStarted) onStarted();
        history.replace(nextRoute);
    }, [onStarted, history, nextRoute]);

    useEffect(() => {
        const timerID = setTimeout(() => {
            if (settings.autoplay) {
                // console.log('Auto-advance onClickNext()');
                if (nextEpisode) {
                    onClickNext();
                } else {
                    onClickBack();
                }
            }
        }, 10 * 1000);
        return () => {
            clearTimeout(timerID);
        };
    }, [settings.autoplay, nextEpisode, onClickNext, onClickBack]);

    return (
        <Credits>
            <FlexCol alignItems='flex-end' justifyContent='flex-end' rowGap='2rem'>
                <EpisodeTitle
                    isSingle={isSingle}
                    series={media}
                    seasonNum={nextEpisode?.seasonNumber}
                    episodeNum={nextEpisode?.number}
                    episodeName={nextEpisode?.name}
                    align='end'
                />

                <FlexRow columnGap='2rem'>
                    {nextRoute ? (
                        <ButtonLink onClick={onClickBack}>
                            <FaArrowLeft /> Back
                        </ButtonLink>
                    ) : (
                        <TimerButtonLink onClick={onClickBack} label='Back' />
                    )}
                    {nextRoute &&
                        (settings.autoplay ? (
                            <TimerButtonLink onClick={onClickNext} label='Next' />
                        ) : (
                            <ButtonLink onClick={onClickNext}>Next</ButtonLink>
                        ))}
                </FlexRow>
            </FlexCol>
        </Credits>
    );
}

CreditsContainer.propTypes = propTypes;
export default CreditsContainer;
