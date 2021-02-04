import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMedia } from '../hooks';
import { Loading } from '../components';
import PlayerContainer from '../containers/PlayerContainer';
import CreditsContainer from '../containers/CreditsContainer';

export default function Watch() {
    const { categorySlug, mediaSlug, seasonSlug, episodeSlug } = useParams();
    const media = useMedia(categorySlug, mediaSlug, seasonSlug, episodeSlug);
    const [ended, setEnded] = useState(false);

    if (!media.loaded) return <Loading visible />;

    return ended ? (
        <CreditsContainer
            media={media}
            onStarted={() => {
                setEnded(false);
            }}
        />
    ) : (
        <PlayerContainer media={media} folder={seasonSlug} onEnded={() => setEnded(true)} />
    );
}
