import { useEffect, useMemo, useState } from 'react';
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
} from '../utils';

export default function useAWSMedia(categorySlug, mediaSlug) {
    const baseURL = getAWSBaseURL();
    const jsonURL = `${baseURL}/${categorySlug}/${mediaSlug}/meta.json`;
    const [meta, setMetadata] = useState({}); // useLocalStorage(jsonURL, {});
    console.log('jsonURL', jsonURL);
    // TODO save results to context
    const s3Client = useMemo(
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

        async function isUrlFound(url) {
            try {
                const response = await fetch(url, {
                    method: 'HEAD',
                    cache: 'no-cache',
                });

                return response.status === 200;
            } catch (error) {
                // console.log('isUrlFound', error);
                return false;
            }
        }

        async function fetchData() {
            const isValidUrl = await isUrlFound(jsonURL);

            async function getSingleJSON(item) {
                const filePath = `${baseURL}/${item.Key}`;
                const videoMeta = await getVideoMeta(filePath);
                // TODO: pick random hue?
                return {
                    backgroundHue: 20,
                    backgroundPath: `${baseURL}/background.jpg`,
                    // catgegory,
                    contentRating: '',
                    description: '',
                    duration: videoMeta ? secondsToDuration(videoMeta.duration) : '00:00:00',
                    filePath,
                    genres: [],
                    // imdb
                    name: toName(getFileName(item.Key)),
                    posterPath: `${baseURL}/poster.jpg`,
                    resolution: videoMeta && videoMeta.width >= 1080 ? 'hd' : 'sd',
                    slug: getFileName(item.Key),
                    schema: '1.0',
                    // tmdb
                    // year
                    type: 'movie',
                };
            }

            function getJSON(slug, contents) {
                const directories = contents.filter((item) => item.Key.endsWith('/'));
                // Remove root directory
                directories.shift();
                const rootfiles = contents
                    .filter((item) => !item.Key.endsWith('/') && getPathDepth(item.Key) === 2)
                    .map((item) => item.Key);
                const posterFile = rootfiles.find((file) => file.includes('poster.'));
                const backgroundFile = rootfiles.find((file) => file.includes('background.'));
                const mediafiles = contents.filter((item) => !item.Key.endsWith('/') && getPathDepth(item.Key) > 2);

                const seasons = directories.map((directory, index) => {
                    const seasonName = toName(removeNumbering(getLastDirectory(directory.Key)));
                    const seasonEpisodes = mediafiles.filter((item) => item.Key.includes(directory.Key));
                    const episodes = seasonEpisodes.map((item) => {
                        return {
                            duration: '00:00:00',
                            name: toName(removeNumbering(getFileName(item.Key))),
                            filePath: `${baseURL}/${item.Key}`,
                        };
                    });
                    const season = {
                        episodeCount: episodes.length,
                        episodes,
                        seasonNumber: index + 1,
                        name: seasonName,
                    };
                    return season;
                });

                return {
                    backgroundHue: 20,
                    backgroundPath: backgroundFile ? `${baseURL}/${backgroundFile}` : null,
                    // category,
                    contentRating: '',
                    description: '',
                    genres: [],
                    // imdb
                    name: toName(slug),
                    posterPath: posterFile ? `${baseURL}/${posterFile}` : null,
                    // resolution
                    seasons,
                    slug,
                    schema: '1.0',
                    // tmdb
                    // year
                    type: 'tv',
                };
            }

            function fetchRootMedia() {
                return s3Client
                    .listObjectsV2({ Prefix: `${categorySlug}/${mediaSlug}/` })
                    .promise()
                    .then((data) => data.Contents)
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error, error.stack);
                    });
            }

            console.log('fetchData isValidUrl:', isValidUrl);
            if (isValidUrl) {
                fetch(jsonURL)
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            setMetadata({
                                isLoaded: true,
                                data: result,
                                ttl: TTL,
                            });
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            console.log('fetchData error', error);
                            setMetadata({
                                isLoaded: true,
                                error,
                                ttl: TTL,
                            });
                        }
                    );
            } else {
                const rootMedia = await fetchRootMedia();
                const singleMedia = rootMedia.find(
                    (item) => getPathDepth(item.Key) === 2 && (item.Key.endsWith('.mp4') || item.Key.endsWith('.m4v'))
                );
                const initialJSON = singleMedia ? await getSingleJSON(singleMedia) : getJSON(mediaSlug, rootMedia);
                console.log('initialJSON', initialJSON);
                s3Client
                    .putObject({
                        Key: `${categorySlug}/${mediaSlug}/meta.json`,
                        ContentType: 'json/text',
                        Body: JSON.stringify(initialJSON),
                    })
                    .promise()
                    .then((result) => {
                        console.log(result);
                        // result.ETag
                        setMetadata({
                            isLoaded: true,
                            data: initialJSON,
                            ttl: TTL,
                        });
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error, error.stack);
                    });
            }
        }

        // if (meta.isLoaded && meta.ttl > NOW) {
        if (meta.isLoaded) {
            // Pull from cache
        } else {
            fetchData();
        }
        // if (!meta.isLoaded) fetchData();
    }, [meta, setMetadata, baseURL, jsonURL, categorySlug, mediaSlug, s3Client]);

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
