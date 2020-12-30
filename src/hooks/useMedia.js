import { useEffect, useState } from 'react';
// import useContent from './useContent';
import useAWSMedia from './useAWSMedia';
import { toSlug } from '../utils';

export default function useMedia(categorySlug, mediaSlug, seasonName, episodeName) {
    // const { content, loaded } = useContent('media');
    const [meta] = useAWSMedia(
        `https://${process.env.REACT_APP_AWS_BUCKET}.s3.${process.env.REACT_APP_AWS_DEFAULT_REGION}.amazonaws.com/${categorySlug}/${mediaSlug}/`
    );
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

        const mediaRef = meta; // content.find((series) => mediaSlug === toSlug(series.name));
        const isSingle = !!(mediaRef && mediaRef.type === 'movie');
        // const categorySlug = toSlug(mediaRef.category);

        // Can't use arrow-function as 'this' won't be replaced properly
        function isCurrent(item) {
            return this === toSlug(item.name);
        }

        // Season
        const seasonSlug = toSlug(seasonName);
        let seasonIndex = isSingle ? 0 : mediaRef.seasons.findIndex(isCurrent, seasonSlug);
        // If we can't find the season, pick the first one
        if (seasonIndex === -1) seasonIndex = 0;
        const seasonRef = isSingle ? mediaRef : mediaRef.seasons[seasonIndex];
        const episodes = isSingle ? [seasonRef] : seasonRef.episodes;
        const season = {
            index: seasonIndex,
            number: seasonRef?.seasonNumber,
            slug: seasonSlug,
            route: `/tv/${mediaSlug}/details/${seasonSlug}`,
            name: seasonRef.name,
            year: seasonRef?.year ?? mediaRef?.year,
            description: seasonRef?.description ?? mediaRef?.description,
            background: seasonRef?.background ?? mediaRef?.backgroundPath,
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
                number: episodeIndex + 1,
                slug: episodeSlug,
                route: isSingle ? `/${categorySlug}/${mediaSlug}/watch` : `/tv/${mediaSlug}/watch/${seasonSlug}/${episodeSlug}`,
                name: episodeRef.name,
                filePath: episodeRef.filePath,
                subPath: episodeRef.subPath,
                duration: episodeRef.duration,
            }
            : null;

        // Next Episode
        let nextEpisode = null;
        const nextEpisodeRef = episodes[episodeIndex + 1] ?? null;
        if (nextEpisodeRef) {
            nextEpisode = {
                index: episodeIndex + 1,
                number: episodeIndex + 2,
                slug: toSlug(nextEpisodeRef.name),
                route: `/${categorySlug}/${mediaSlug}/watch/${seasonSlug}/${toSlug(nextEpisodeRef.name)}`,
                name: nextEpisodeRef.name,
                filePath: nextEpisodeRef.filePath,
                subPath: nextEpisodeRef.subPath,
                duration: nextEpisodeRef.duration,
            };
        }

        setMedia({
            loaded: meta.isLoaded,
            isSingle,
            route: `/${categorySlug}/${mediaSlug}/details`,

            id: mediaRef.docId,
            backgroundHue: mediaRef.backgroundHue,
            backgroundPath: mediaRef.backgroundPath,
            category: mediaRef.category,
            contentRating: mediaRef.contentRating,
            description: mediaRef.description,
            duration: mediaRef.duration,
            genres: mediaRef.genres,
            imdb: mediaRef.imdb,
            name: mediaRef.name,
            posterPath: mediaRef.posterPath,
            resolution: mediaRef.resolution,
            seasons: isSingle ? null : mediaRef.seasons,
            slug: mediaRef.slug,
            tmdb: mediaRef.tmdb,
            year: mediaRef?.year ?? (isSingle ? null : mediaRef.seasons[0]?.year),

            season,
            episode,
            nextEpisode,
        });
    }, [meta, categorySlug, mediaSlug, seasonName, episodeName]);
    // console.log('useMedia', media);
    return media;
}
