import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMedia } from '../hooks';
import { Loading } from '../components';
import PlayerContainer from '../containers/PlayerContainer';
import CreditsContainer from '../containers/CreditsContainer';

// TODO get tokenized s3 links

export default function Watch() {
    const { mediaSlug, seasonSlug, episodeSlug } = useParams();
    const media = useMedia(mediaSlug, seasonSlug, episodeSlug);
    const [ended, setEnded] = useState(false);

    if (!media.loaded) return <Loading visible />;
    console.log('ended', ended);
    return ended ? (
        <CreditsContainer
            media={media}
            onStarted={() => {
                console.log('onstarted clicked');
                setEnded(false);
            }}
        />
    ) : (
        <PlayerContainer media={media} onEnded={() => setEnded(true)} />
    );
}
