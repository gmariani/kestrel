import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../components';
import PlayerContainer from '../containers/PlayerContainer';
import CreditsContainer from '../containers/CreditsContainer';
import { useContent } from '../hooks';
import { toSlug, getSeries } from '../utils';
import * as ROUTES from '../constants/routes';

// TODO get tokenized s3 links

export default function Watch() {
    // Hooks
    const { content: allMedia, loaded } = useContent('media');
    const { mediaId, season, episodeSlug } = useParams();
    const [ended, setEnded] = useState(false);

    // Wait until firebase replies with episode data
    if (!loaded) return <Loading visible />;

    const media = getSeries(allMedia, mediaId);
    const seasonIndex = parseInt(season, 10);
    const isSingle = !!(media && media.filePath);
    const episodes = isSingle ? [media] : media.seasons[seasonIndex].episodes;
    // Can't use arrow-function as 'this' won't be replaced properly
    const episodeIndex = episodes.findIndex(function isCurrentEpisode(episode) {
        return this === toSlug(episode.name);
    }, episodeSlug);
    const currentEpisode = episodes[episodeIndex];
    const nextEpisode = episodes[episodeIndex + 1] ? episodes[episodeIndex + 1] : null;
    const nextRoute = nextEpisode ? `${ROUTES.WATCH}${mediaId}/${seasonIndex}/${toSlug(nextEpisode.name)}` : null;

    return ended ? (
        <CreditsContainer
            isSingle={isSingle}
            media={media}
            seasonIndex={seasonIndex}
            episodeIndex={episodeIndex}
            currentEpisode={currentEpisode}
            backRoute={`${ROUTES.DETAILS}${mediaId}`}
            nextRoute={nextRoute}
            onStarted={() => setEnded(false)}
        />
    ) : (
        <PlayerContainer
            isSingle={isSingle}
            media={media}
            seasonIndex={seasonIndex}
            episodeIndex={episodeIndex}
            currentEpisode={currentEpisode}
            nextEpisode={nextEpisode}
            nextRoute={nextRoute}
            onEnded={() => setEnded(true)}
        />
    );
}
