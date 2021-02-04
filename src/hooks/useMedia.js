import { useEffect, useState } from 'react';
import useAWSMedia from './useAWSMedia';
import { toSlug } from '../utils';

export default function useMedia(categorySlug, mediaSlug, seasonSlug, episodeName) {
    const meta = useAWSMedia(categorySlug, mediaSlug);
    // console.log('useMedia', categorySlug, mediaSlug, seasonSlug, episodeName, meta);
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
        const isSingle = mediaRef && mediaRef.type === 'movie';
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
        // If movie doesn't have any extras
        if (!mediaRef.extras) mediaRef.extras = [];
        const episodes = isSingle ? [seasonRef, ...mediaRef.extras] : seasonRef.episodes;

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
        const isNextSeason = mediaRef.seasons && mediaRef.seasons[seasonIndex + 1] && !episodes[episodeIndex + 1];
        const nextSeason = isSingle ? null : mediaRef.seasons[seasonIndex + 1] ?? null;
        const nextSeasonEpisodes = isNextSeason && nextSeason ? nextSeason.episodes : null;
        const nextSeasonSlug = isNextSeason ? toSlug(nextSeason.name) : seasonSlug;

        let nextEpisode = null;
        const nextEpisodeRef = isNextSeason ? nextSeasonEpisodes[0] : episodes[episodeIndex + 1] ?? null;
        if (nextEpisodeRef) {
            nextEpisode = {
                index: isNextSeason ? 0 : episodeIndex + 1,
                seasonIndex: isNextSeason ? seasonIndex + 1 : season.index,
                seasonNumber: isNextSeason ? season.number + 1 : season.number,
                number: isNextSeason ? 1 : nextEpisodeRef.episodeNumber ?? episodeIndex + 2,
                slug: toSlug(nextEpisodeRef.name),
                route: `/${categorySlug}/${mediaSlug}/watch/${nextSeasonSlug}/${toSlug(nextEpisodeRef.name)}`,
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
