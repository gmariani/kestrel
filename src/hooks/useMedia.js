import { useEffect, useState } from 'react';
import useContent from './useContent';
import { toSlug } from '../utils';
import * as ROUTES from '../constants/routes';

export default function useMedia(mediaId, seasonName, episodeName) {
    const { content, loaded } = useContent('media');
    const [media, setMedia] = useState({
        loaded: false,
        isSingle: true,
        route: `${ROUTES.DETAILS}${mediaId}`,
        season: null,
        episode: null,
        nextEpisode: null,
    });

    useEffect(() => {
        if (!loaded) return;

        const mediaRef = content.find((series) => mediaId === series.docId);
        const isSingle = !!(mediaRef && mediaRef.filePath);

        // Can't use arrow-function as 'this' won't be replaced properly
        function isCurrent(item) {
            return this === toSlug(item.name);
        }

        // Season
        const seasonSlug = toSlug(seasonName);
        const seasonIndex = isSingle ? 0 : mediaRef.seasons.findIndex(isCurrent, seasonSlug);
        const seasonRef = isSingle ? mediaRef : mediaRef.seasons[seasonIndex];
        const episodes = isSingle ? [seasonRef] : seasonRef.episodes;
        const season = {
            index: seasonIndex,
            number: seasonRef?.seasonNumber,
            slug: seasonSlug,
            route: `${ROUTES.DETAILS}${mediaId}/${seasonSlug}}`,
            name: seasonRef.name,
            episodes,
        };

        // Episode
        const episodeSlug = toSlug(episodeName);
        const episodeIndex = episodes.findIndex(isCurrent, episodeSlug);
        const episodeRef = episodes[episodeIndex];
        const episode = {
            index: episodeIndex,
            number: episodeIndex + 1,
            slug: episodeSlug,
            route: `${ROUTES.WATCH}${mediaId}/${seasonSlug}/${toSlug(episodeRef.name)}`,
            name: episodeRef.name,
            filePath: episodeRef.filePath,
            subPath: episodeRef.subPath,
            duration: episodeRef.duration,
        };

        // Next Episode
        const nextEpisodeRef = episodes[episodeIndex + 1] ?? null;
        let nextEpisode = null;
        if (nextEpisodeRef) {
            nextEpisode = {
                index: episodeIndex + 1,
                number: episodeIndex + 2,
                slug: toSlug(nextEpisodeRef.name),
                route: `${ROUTES.WATCH}${mediaId}/${seasonSlug}/${toSlug(nextEpisodeRef.name)}`,
                name: nextEpisodeRef.name,
                filePath: nextEpisodeRef.filePath,
                subPath: nextEpisodeRef.subPath,
                duration: nextEpisodeRef.duration,
            };
        }

        setMedia({
            loaded,
            isSingle,
            resolution: mediaRef.resolution,
            name: mediaRef.name,
            contentRating: mediaRef.contentRating,
            season,
            episode,
            nextEpisode,
        });
    }, [loaded, content, mediaId, seasonName, episodeName]);
    // console.log('useMedia', media);
    return media;
}
