import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Credits, FlexCol, FlexRow, Link, Button, CreditsPreview, EpisodeTitle } from '../components';
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
    // TODO fix button/link styling
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
                    <Link theme={nextRoute ? 'secondary' : 'primary'} onClick={onStarted} to={media.route}>
                        Back
                    </Link>
                    <Button theme={nextRoute ? 'secondary' : 'primary'} onClick={onClickBack}>
                        Back
                    </Button>
                    {nextRoute && (
                        <>
                            <Link theme='primary' onClick={onStarted} to={nextRoute}>
                                Next
                            </Link>
                            <Button theme='primary' onClick={onClickNext}>
                                Next
                            </Button>
                        </>
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
