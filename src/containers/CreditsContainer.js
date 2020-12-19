import React from 'react';
import PropTypes from 'prop-types';
import { Credits, FlexCol, FlexRow, Link, CreditsPreview, EpisodeTitle } from '../components';
import mediaInterface from '../interfaces/media';

const propTypes = {
    media: mediaInterface,
    onStarted: PropTypes.func,
};

function CreditsContainer({ media, onStarted }) {
    const { isSingle, season, episode, nextEpisode } = media;
    const nextRoute = media.nextEpisode?.route;
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
                    {nextRoute && (
                        <Link theme='primary' onClick={onStarted} to={nextRoute}>
                            Next
                        </Link>
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
