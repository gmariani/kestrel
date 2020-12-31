import { useEffect, useMemo } from 'react';
import S3 from 'aws-sdk/clients/s3';
import useLocalStorage from './useLocalStorage';
import {
    toName,
    getAWSBaseURL,
    getVideoMeta,
    getFileName,
    getPathDepth,
    getLastDirectory,
    removeNumbering,
    secondsToDuration,
    toSlug,
} from '../utils';

export default function useAWSMedia(categorySlug, mediaSlug) {
    const BASE_URL = getAWSBaseURL();
    const keyPrefix = `${categorySlug}/${mediaSlug}`;
    const META_JSON = 'meta.json';
    const [meta, setMetadata] = useLocalStorage(`${BASE_URL}/${keyPrefix}/${META_JSON}`, {});
    // const [meta, setMetadata] = useState({});

    const S3_CLIENT = useMemo(
        () =>
            new S3({
                apiVersion: '2006-03-01',
                region: process.env.REACT_APP_AWS_DEFAULT_REGION,
                credentials: {
                    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
                },
                params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
            }),
        []
    );

    useEffect(() => {
        const NOW = new Date().getTime();
        const TTL = new Date(NOW + 15 * 60000).getTime(); // +15min from now
        // https://juliangaramendy.dev/blog/use-promise-subscription
        // eslint-disable-next-line prefer-const
        let isSubscribed = true;

        function isUrlFound(url) {
            return fetch(url, {
                method: 'HEAD',
                cache: 'no-cache',
            })
                .then((response) => response.status === 200)
                .catch(() => {
                    // console.log('isUrlFound', error);
                    return false;
                });
        }

        async function getMovieJSON(localBaseURL, item, contents) {
            const directories = contents.filter((item2) => item2.Key.endsWith('/')).map((item2) => item2.Key);
            const rootDir = directories.shift().slice(0, -1);
            const category = rootDir.split('/')[0];
            // const slug = rootDir.split('/')[1];
            const filePath = `${localBaseURL}/${item.Key}`;
            const videoMeta = await getVideoMeta(filePath);
            // TODO: pick random hue?
            return {
                backgroundHue: 20,
                backgroundPath: `${localBaseURL}/background.jpg`,
                category,
                contentRating: '',
                description: '',
                duration: videoMeta ? secondsToDuration(videoMeta.duration) : '00:00:00',
                filePath,
                genres: [],
                // imdb
                name: toName(getFileName(item.Key)),
                posterPath: `${localBaseURL}/poster.jpg`,
                resolution: videoMeta && videoMeta.width >= 1080 ? 'hd' : 'sd',
                slug: toSlug(getFileName(item.Key)),
                schema: '1.0',
                // tmdb
                // year
                type: 'movie',
            };
        }

        async function getTVJSON(localBaseURL, contents) {
            const directories = contents.filter((item) => item.Key.endsWith('/')).map((item) => item.Key);
            const rootDir = directories.shift().slice(0, -1);
            const category = rootDir.split('/')[0];
            const slug = rootDir.split('/')[1];
            const rootfiles = contents
                .filter((item) => !item.Key.endsWith('/') && getPathDepth(item.Key) === 2)
                .map((item) => item.Key);
            const posterFile = rootfiles.find((file) => file.includes('poster.'));
            const backgroundFile = rootfiles.find((file) => file.includes('background.'));
            const mediafiles = contents.filter(
                (item) =>
                    !item.Key.endsWith('/') &&
                    getPathDepth(item.Key) > 2 &&
                    (item.Key.endsWith('.mp4') || item.Key.endsWith('.m4v') || item.Key.endsWith('.vtt'))
            );

            const seasons = directories.map((directory, index) => {
                const seasonName = toName(removeNumbering(getLastDirectory(directory)));
                const seasonBackgroundFile = mediafiles.find((file) => file.includes('background.'));
                const seasonEpisodes = mediafiles
                    .map((item) => item.Key)
                    .filter((item) => item.includes(directory) && !item.endsWith('.vtt'));
                const seasonSubtitles = mediafiles
                    .map((item) => item.Key)
                    .filter((item) => item.includes(directory) && item.endsWith('.vtt'));

                // const videoMeta = seasonEpisodes.length > 0 ? await getVideoMeta(seasonEpisodes[0]) : null;
                // const resolution = videoMeta && videoMeta.width >= 1080 ? 'hd' : 'sd'

                const episodes = seasonEpisodes.map((item) => {
                    const fileName = getFileName(item);
                    const ep = {
                        duration: '00:00:00',
                        name: toName(removeNumbering(getFileName(item))),
                        filePath: `${localBaseURL}/${item}`,
                    };
                    // Corresponding subtitles exist? Add them in
                    if (seasonSubtitles.includes(`${directory}${fileName}.vtt`)) {
                        ep.subPath = `${localBaseURL}/${directory}${fileName}.vtt`;
                    }
                    return ep;
                });

                const season = {
                    description: '',
                    episodeCount: episodes.length,
                    episodes,
                    name: seasonName,
                    // resolution
                    seasonNumber: index + 1,
                    // year
                };
                if (backgroundFile) {
                    season.background = `${localBaseURL}/${seasonBackgroundFile.Key}`;
                }
                return season;
            });

            return {
                backgroundHue: 20,
                backgroundPath: backgroundFile ? `${localBaseURL}/${backgroundFile}` : null,
                category,
                contentRating: '',
                description: '',
                genres: [],
                // imdb
                name: toName(slug),
                posterPath: posterFile ? `${localBaseURL}/${posterFile}` : null,
                // resolution
                seasons,
                slug,
                schema: '1.0',
                // tmdb
                // year
                type: 'tv',
            };
        }

        function fetchRootMedia(prefix) {
            return S3_CLIENT.listObjectsV2({ Prefix: `${prefix}/` })
                .promise()
                .then((data) => data.Contents)
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error(error, error.stack);
                });
        }

        function fetchJSON(url) {
            return fetch(url)
                .then((res) => res.json())
                .then((result) => result)
                .catch((error) => {
                    console.log('fetchData error', error);
                    return error;
                });
        }

        function putJSON(prefix, data) {
            return S3_CLIENT.putObject({
                Key: `${prefix}/meta.json`,
                ContentType: 'json/text',
                Body: JSON.stringify(data),
            })
                .promise()
                .then((result) => result)
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error(error, error.stack);
                });
        }

        // Must be wrapped in an async function to be called within useEffect
        async function fetchData() {
            const isValidUrl = await isUrlFound(`${BASE_URL}/${keyPrefix}/${META_JSON}`);

            console.log('fetchData', keyPrefix, `isValidUrl: ${isValidUrl}`);
            if (isValidUrl) {
                // If meta.json exists, load it and cache it to localStorage //
                const json = await fetchJSON(`${BASE_URL}/${keyPrefix}/${META_JSON}`);
                if (isSubscribed) {
                    setMetadata({
                        isLoaded: true,
                        data: json,
                        ttl: TTL,
                    });
                }
            } else {
                // If meta.json doesn't exist, create an initial one //

                // Get root directory files
                const rootMedia = await fetchRootMedia(keyPrefix);

                // Look for a media file in the root, as opposed to within a season folder
                const singleMedia = rootMedia.find(
                    (item) => getPathDepth(item.Key) === 2 && (item.Key.endsWith('.mp4') || item.Key.endsWith('.m4v'))
                );

                // Create initial JSON
                const initialJSON = singleMedia
                    ? await getMovieJSON(BASE_URL, singleMedia, rootMedia)
                    : getTVJSON(BASE_URL, rootMedia);
                console.log('initialJSON', initialJSON);
                // Write the new meta.json to S3
                await putJSON(keyPrefix, initialJSON);

                // Cache JSON to localStorage
                if (isSubscribed) {
                    setMetadata({
                        isLoaded: true,
                        data: initialJSON,
                        ttl: TTL,
                    });
                }
            }
        }

        if (meta.isLoaded && meta.ttl > NOW) {
            // Pull from cache
        } else {
            fetchData();
        }

        // eslint-disable-next-line no-return-assign
        return () => (isSubscribed = false);
    }, [meta, setMetadata, BASE_URL, META_JSON, S3_CLIENT, keyPrefix]);

    // const setMeta = (data) => {
    //     // Requires atleast two slashes
    //     // Requires s3:ListBucket
    //     return s3Client
    //         .putObject({
    //             Key: `${prefix}meta.json`,
    //             ContentType: 'json/text',
    //             Body: JSON.stringify(data),
    //         })
    //         .promise()
    //         .then((result) => {
    //             console.log('setMeta', result);
    //             return true;
    //         })
    //         .catch((error) => {
    //             // eslint-disable-next-line no-console
    //             console.error(error, error.stack);
    //             return false;
    //         });
    // };

    return meta;
}
