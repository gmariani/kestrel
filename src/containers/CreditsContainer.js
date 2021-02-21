import React, { useCallback, useEffect, useState } from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { TimerButtonLink, Credits, FlexCol, FlexRow, ButtonLink, EpisodeTitle } from '../components';
import mediaInterface from '../interfaces/media';
import { useLocalStorage } from '../hooks';

const propTypes = {
    media: mediaInterface,
    setFocus: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
    onStarted: PropTypes.func,
};

function CreditsContainer({ media, setFocus, hasFocusedChild, onStarted }) {
    const history = useHistory();
    const [selectedButton, setSelectedButton] = useState('ACTION-NEXT');
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

    useEffect(() => {
        // Set initial focus inorder to jumpstart spacial navigation
        if (!hasFocusedChild) setFocus('ACTION-NEXT');
    }, [hasFocusedChild, setFocus]);

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
                        <ButtonLink
                            focusKey='ACTION-BACK'
                            onEnterPress={() => {
                                // console.log('onEnterPress onClickBack()');
                                onClickBack();
                            }}
                            onClick={onClickBack}
                            onBecameFocused={() => {
                                setSelectedButton('ACTION-BACK');
                            }}
                            selected={selectedButton === 'ACTION-BACK'}>
                            <FaArrowLeft /> Back
                        </ButtonLink>
                    ) : (
                        <TimerButtonLink
                            focusKey='ACTION-BACK'
                            onEnterPress={() => {
                                // console.log('onEnterPress onClickBack()');
                                onClickBack();
                            }}
                            onClick={onClickBack}
                            onBecameFocused={() => {
                                setSelectedButton('ACTION-BACK');
                            }}
                            selected={selectedButton === 'ACTION-BACK'}
                            label='Back'
                        />
                    )}
                    {nextRoute &&
                        (settings.autoplay ? (
                            <TimerButtonLink
                                focusKey='ACTION-NEXT'
                                onEnterPress={() => {
                                    // console.log('onEnterPress onClickNext()');
                                    onClickNext();
                                }}
                                onClick={onClickNext}
                                onBecameFocused={() => {
                                    setSelectedButton('ACTION-NEXT');
                                }}
                                selected={selectedButton === 'ACTION-NEXT'}
                                label='Next'
                            />
                        ) : (
                            <ButtonLink
                                focusKey='ACTION-NEXT'
                                onEnterPress={() => {
                                    // console.log('onEnterPress onClickNext()');
                                    onClickNext();
                                }}
                                onClick={onClickNext}
                                onBecameFocused={() => {
                                    setSelectedButton('ACTION-NEXT');
                                }}
                                selected={selectedButton === 'ACTION-NEXT'}>
                                Next
                            </ButtonLink>
                        ))}
                </FlexRow>
            </FlexCol>
        </Credits>
    );
}

CreditsContainer.propTypes = propTypes;
export default withFocusable({
    trackChildren: true,
})(CreditsContainer);
