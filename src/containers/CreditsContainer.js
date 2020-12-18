import React from 'react';
import PropTypes from 'prop-types';
import { Credits, CreditsDetail, Row, Link, CreditsPreview, EpisodeTitle } from '../components';

const propTypes = {
    isSingle: PropTypes.string,
    media: PropTypes.shape({
        filePath: PropTypes.string,
        slug: PropTypes.string,
        resolution: PropTypes.string,
        seasons: PropTypes.arrayOf(PropTypes.object),
    }),
    seasonIndex: PropTypes.string,
    episodeIndex: PropTypes.number,
    currentEpisode: PropTypes.shape({
        name: PropTypes.string,
    }),
    backRoute: PropTypes.string,
    nextRoute: PropTypes.string,
    onStarted: PropTypes.func,
};

function CreditsContainer({
    isSingle,
    media,
    seasonIndex,
    episodeIndex,
    currentEpisode,
    backRoute,
    nextRoute,
    onStarted,
}) {
    return (
        <Credits>
            <CreditsDetail>
                <EpisodeTitle
                    isSingle={isSingle}
                    series={media}
                    seasonNum={seasonIndex + 1}
                    episodeNum={episodeIndex + 1}
                    episodeTitle={currentEpisode.name}
                />
                <Row>
                    <Link theme={nextRoute ? 'secondary' : 'primary'} onClick={onStarted} to={backRoute}>
                        Back
                    </Link>
                    {nextRoute ? (
                        <Link theme='primary' onClick={onStarted} to={nextRoute}>
                            Next
                        </Link>
                    ) : null}
                </Row>
            </CreditsDetail>
            {/* {nextEpisode && (
                <CreditsPreview
                    nextIndex={episodeIndex + 2}
                    nextThumbnail={nextEpisode.thumbnail}
                    nextName={nextEpisode.name}
                />
            )} */}
        </Credits>
    );
}

CreditsContainer.propTypes = propTypes;
export default CreditsContainer;
