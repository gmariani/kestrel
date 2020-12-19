import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMedia } from '../hooks';
import { Loading } from '../components';
import PlayerContainer from '../containers/PlayerContainer';
import CreditsContainer from '../containers/CreditsContainer';

// TODO get tokenized s3 links

export default function Watch() {
    // Hooks
    const { mediaId, season, episodeSlug } = useParams();
    const media = useMedia(mediaId, season, episodeSlug);
    const [ended, setEnded] = useState(false);

    if (!media.loaded) return <Loading visible />;
    return ended ? (
        <CreditsContainer media={media} nextRoute={media.nextEpisode?.route} onStarted={() => setEnded(false)} />
    ) : (
        <PlayerContainer media={media} onEnded={() => setEnded(true)} />
    );
}
