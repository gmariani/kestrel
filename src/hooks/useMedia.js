import { useEffect, useState } from 'react';
import useAWSMedia from './useAWSMedia';
import { toSlug } from '../utils';

export default function useMedia(categorySlug, mediaSlug, seasonSlug, episodeName) {
    const meta = useAWSMedia(categorySlug, mediaSlug);
    // console.log('useMedia', categorySlug, mediaSlug, meta);
    const [media, setMedia] = useState({
        loaded: false,
        isSingle: true,
        route: ``,
        season: null,
        episode: null,
        nextEpisode: null,
    });

    useEffect(() => {
        if (!meta.isLoaded) return;

        const mediaRef = meta.data; // content.find((series) => mediaSlug === toSlug(series.name));
        const isSingle = !!(mediaRef && mediaRef.type === 'movie');
        // const categorySlug = toSlug(mediaRef.category);

        // Can't use arrow-function as 'this' won't be replaced properly
        function isCurrent(item) {
            return this === toSlug(item.name);
        }

        // Season
        let seasonIndex = isSingle ? 0 : mediaRef.seasons.findIndex(isCurrent, seasonSlug);
        // If we can't find the season, pick the first one
        if (seasonIndex === -1) seasonIndex = 0;
        const seasonRef = isSingle ? mediaRef : mediaRef.seasons[seasonIndex];
        const episodes = isSingle ? [seasonRef] : seasonRef.episodes;
        const season = {
            index: seasonIndex,
            number: seasonRef?.seasonNumber ?? 0,
            slug: seasonSlug ?? '',
            route: isSingle ? `/${categorySlug}/${mediaSlug}/details` : `/tv/${mediaSlug}/details/${seasonSlug}`,
            name: seasonRef.name,
            year: seasonRef?.year ?? mediaRef?.year,
            description: seasonRef?.description ?? mediaRef?.description,
            backgroundURL: seasonRef?.backgroundURL ?? mediaRef?.backgroundURL,
            resolution: seasonRef?.resolution ?? mediaRef?.resolution,
            episodes,
        };

        // Episode
        const episodeSlug = toSlug(episodeName);
        let episodeIndex = episodes.findIndex(isCurrent, episodeSlug);
        // If we can't find the episode, pick the first one
        if (episodeIndex === -1) episodeIndex = 0;
        const episodeRef = episodes[episodeIndex];
        // prettier-ignore
        const episode = episodeRef
            ? {
                index: episodeIndex,
                number: episodeRef.episodeNumber ?? episodeIndex + 1,
                slug: episodeSlug,
                route: isSingle ? `/${categorySlug}/${mediaSlug}/watch` : `/tv/${mediaSlug}/watch/${seasonSlug}/${episodeSlug}`,
                name: episodeRef.name,
                fileURL: episodeRef.fileURL,
                subtitleURL: episodeRef.subtitleURL,
                duration: episodeRef.duration,
            }
            : null;

        // Next Episode
        let nextEpisode = null;
        const nextEpisodeRef = episodes[episodeIndex + 1] ?? null;
        if (nextEpisodeRef) {
            nextEpisode = {
                index: episodeIndex + 1,
                number: nextEpisodeRef.episodeNumber ?? episodeIndex + 2,
                slug: toSlug(nextEpisodeRef.name),
                route: `/${categorySlug}/${mediaSlug}/watch/${seasonSlug}/${toSlug(nextEpisodeRef.name)}`,
                name: nextEpisodeRef.name,
                fileURL: nextEpisodeRef.fileURL,
                subtitleURL: nextEpisodeRef.subtitleURL,
                duration: nextEpisodeRef.duration,
            };
        }

        setMedia({
            loaded: meta.isLoaded,
            isSingle,
            route: `/${categorySlug}/${mediaSlug}/details`,

            id: `/${categorySlug}/${mediaSlug}`, // mediaRef.docId,
            backgroundHue: mediaRef.backgroundHue,
            backgroundURL: mediaRef.backgroundURL,
            category: mediaRef.category,
            contentRating: mediaRef.contentRating,
            description: mediaRef.description,
            duration: mediaRef.duration,
            genres: mediaRef.genres,
            imdb: mediaRef.imdb,
            name: mediaRef.name,
            posterURL: mediaRef.posterURL,
            resolution: mediaRef.resolution,
            seasons: isSingle ? null : mediaRef.seasons,
            slug: mediaRef.slug,
            tmdb: mediaRef.tmdb,
            year: mediaRef?.year ?? (isSingle ? null : mediaRef.seasons[0]?.year),

            // Movie Extras
            extras: isSingle ? mediaRef?.extras : null,

            season,
            episode,
            nextEpisode,
        });
    }, [meta, categorySlug, mediaSlug, seasonSlug, episodeName]);
    // console.log('useMedia', media);
    return media;
}
