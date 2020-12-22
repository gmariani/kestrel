import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Credits, FlexCol, FlexRow, Link, ButtonLink, CreditsPreview, EpisodeTitle } from '../components';
import mediaInterface from '../interfaces/media';

const propTypes = {
    media: mediaInterface,
    onStarted: PropTypes.func,
};

function CreditsContainer({ media, onStarted }) {
    const history = useHistory();
    const { isSingle, season, episode, nextEpisode } = media;
    const nextRoute = nextEpisode?.route;

    const onClickBack = () => {
        if (onStarted) onStarted();
        history.push(media.route);
    };
    const onClickNext = () => {
        if (onStarted) onStarted();
        history.replace(nextRoute);
    };

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
                    <ButtonLink theme={nextRoute ? 'secondary' : 'primary'} onClick={onClickBack}>
                        Back
                    </ButtonLink>
                    {nextRoute && (
                        <ButtonLink theme='primary' onClick={onClickNext}>
                            Next
                        </ButtonLink>
                    )}
                </FlexRow>
            </FlexCol>
            {/* {nextEpisode && (
                <CreditsPreview
                    nextIndex={nextEpisode.index}
                    nextThumbnail={nextEpisode.thumbnail}
                    nextName={nextEpisode.name}
                />
            )} */}
        </Credits>
    );
}

CreditsContainer.propTypes = propTypes;
export default CreditsContainer;
