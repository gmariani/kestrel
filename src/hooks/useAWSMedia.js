import { useEffect, useMemo, useRef, useState } from 'react';
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
    // const [meta, setMetadata] = useLocalStorage(`${BASE_URL}/${keyPrefix}/${META_JSON}`, {isLoaded:false});
    const status = useRef(null);
    const [meta, setMetadata] = useState({ isLoaded: false });

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
        const TTL = new Date(NOW + 15 * 60000).getTime(); // +15 min from now
        const ERROR_TTL = new Date(NOW + 5 * 60000).getTime(); // +5 min from now

        // Don't update the state if component has already been unloaded by React
        // https://juliangaramendy.dev/blog/use-promise-subscription
        // eslint-disable-next-line prefer-const
        let isSubscribed = true;

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

        function onComplete(data) {
            status.current = 'ready';
            console.log('onComplete', keyPrefix, data);
            if (isSubscribed) {
                setMetadata({
                    isLoaded: true,
                    data,
                    ttl: TTL,
                });
            }
        }

        function onError(error) {
            status.current = null;
            console.log('onError', keyPrefix, error);
            if (isSubscribed) {
                setMetadata({
                    isLoaded: true,
                    error,
                    ttl: ERROR_TTL,
                });
            }
        }

        // Must be wrapped in an async function to be called within useEffect
        /*
        Fetch Actions
        - check if cache exists - loadCache()
        - yes
            - load from localstorage/state
        - no
            - check if file exists/fetch file - loadMeta()
            - yes
                - write to localstorage/state
            - no
                - fetch file index - indexMeta()
                - check file durations/generate json - generateMovieMeta()/generateTVMeta()
                - write to localstorage/state
        */

        /**
         * Try to load the cached metadata via useLocalStorage.
         *
         * @param {function} onSuccess If the cached data is loaded
         * @param {function} onFailure If the cached data is not loaded
         */
        function loadCache(onSuccess, onFailure) {
            if (meta.isLoaded && meta.ttl > NOW) {
                // Pull from cache
                console.log('loadCache', keyPrefix, 'success');
                if (onSuccess) onSuccess();
            } else if (status.current === null) {
                // Don't try to fetch more than one time
                console.log('loadCache', keyPrefix, 'failure');
                if (onFailure) onFailure();
            }
        }

        /**
         * Attempt to load the meta.json file.
         *
         * @param {function} onSuccess If meta.json file is loaded successfully
         * @param {function} onFailure If meta.json file is not loaded or found
         */
        function loadMeta(onSuccess, onFailure) {
            status.current = 'busy';
            // console.log('loadMeta', keyPrefix, `${BASE_URL}/${keyPrefix}/${META_JSON}`);
            fetch(`${BASE_URL}/${keyPrefix}/${META_JSON}`)
                .then((res) => res.json())
                .then((result) => {
                    // console.log('loadMeta', keyPrefix, result);
                    if (onSuccess) onSuccess(result);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error('loadMeta', keyPrefix, error);
                    if (onFailure) onFailure(error);
                });
        }

        /**
         * Get the index of files in media directory.
         *
         * @param {function} onSuccess If index is loaded from S3
         * @param {function} onFailure If there was an error with S3
         */
        function indexMeta(onSuccess, onFailure) {
            S3_CLIENT.listObjectsV2({ Prefix: keyPrefix })
                .promise()
                .then((data) => {
                    if (onSuccess) onSuccess(data.Contents);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error('indexMeta error', error);
                    if (onFailure) onFailure(error);
                });
        }

        /**
         * Check media file index for any media files in the root directory. If
         * one is found that means it's a movie as opposed to a TV series. Returns
         * that media object if found.
         *
         * @param {array} fileIndex Array of file paths
         * @returns {string} Returns the file path string if found, undefined if not
         */
        function getSingleMedia(fileIndex) {
            return fileIndex
                .map((item) => item.Key)
                .find(
                    (filePath) =>
                        getPathDepth(filePath) === 2 && (filePath.endsWith('.mp4') || filePath.endsWith('.m4v'))
                );
        }

        /**
         * Try to find any image that starts with "poster.".
         *
         * @param {array} fileIndex Array of file paths
         * @returns {string}
         */
        function getPosterFile(fileIndex) {
            const foundPath = fileIndex.find(
                (path) => path.includes('poster.') && (path.endsWith('.jpg') || path.endsWith('.png'))
            );
            return foundPath ? `${BASE_URL}/${foundPath}` : null;
        }

        /**
         * Try to find any image that starts with "background.".
         *
         * @param {array} fileIndex Array of file paths
         * @returns {string}
         */
        function getBackgroundFile(fileIndex) {
            const foundPath = fileIndex.find(
                (path) => path.includes('background.') && (path.endsWith('.jpg') || path.endsWith('.png'))
            );
            return foundPath ? `${BASE_URL}/${foundPath}` : null;
        }

        /**
         * Generate the season data object. Try to grab  metadata for each video.
         *
         * @param {string} directory Season directory path
         * @param {int} seasonIndex The season order index (0-based)
         * @param {array} mediaFiles Array of file paths for this season
         */
        function getSeason(directory, seasonIndex, mediaFiles) {
            const name = toName(removeNumbering(getLastDirectory(directory)));
            const backgroundFile = getBackgroundFile(mediaFiles.filter((path) => path.includes(directory)));
            const seasonEpisodes = mediaFiles.filter(
                (path) => path.includes(directory) && (path.endsWith('.mp4') || path.endsWith('.m4v'))
            );
            const seasonSubtitles = mediaFiles.filter((path) => path.includes(directory) && path.endsWith('.vtt'));

            return Promise.all(
                seasonEpisodes.map((path) => {
                    const fileName = getFileName(path);
                    // console.log('getSeason', path);
                    return getVideoMeta(`${BASE_URL}/${path}`)
                        .then((videoMeta) => {
                            console.log('getSeason', path, videoMeta);
                            const ep = {
                                duration: videoMeta ? secondsToDuration(videoMeta.duration) : '00:00:00',
                                name: toName(removeNumbering(getFileName(path))),
                                resolution: videoMeta && videoMeta.width >= 1080 ? 'hd' : 'sd',
                                filePath: `${BASE_URL}/${path}`,
                            };
                            // Corresponding subtitles exist? Add them in
                            if (seasonSubtitles.includes(`${directory}${fileName}.vtt`)) {
                                ep.subPath = `${BASE_URL}/${directory}${fileName}.vtt`;
                            }
                            return ep;
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.error('getSeason error', error);
                        });
                })
            ).then((episodes) => {
                const resolution = episodes.length > 0 ? episodes[0].resolution : 'sd';
                return {
                    background: backgroundFile,
                    description: '',
                    episodeCount: episodes.length,
                    episodes,
                    name,
                    resolution,
                    seasonNumber: seasonIndex + 1,
                    // year
                };
            });

            // getVideoMeta(primaryFile)
            //     .then((videoMeta) => {
        }

        /**
         * Generate the meta.json file for a movie media object.
         *
         * @param {string} singlePath Filepath to the media file
         * @param {array} fileIndex Array of file paths
         * @param {function} onSuccess If meta.json is generated successfully
         * @param {function} onFailure If there was an error generating meta.json
         */
        function generateMovieMeta(singlePath, fileIndex, onSuccess, onFailure) {
            const directories = fileIndex.map((item) => item.Key).filter((path) => path.endsWith('/'));

            // Get first directory in list, which is the root directory
            const rootDir = directories.shift().slice(0, -1);

            // Get the parent category from the path
            const category = rootDir.split('/')[0];

            // Get the media slug from the path
            // const slug = rootDir.split('/')[1];

            const rootFiles = fileIndex
                .map((item) => item.Key)
                .filter((path) => !path.endsWith('/') && getPathDepth(path) === 2);

            // Get the poster image file if it exists
            const posterFile = getPosterFile(rootFiles);

            // Get the background image file if it exists
            const backgroundFile = getBackgroundFile(rootFiles);

            // Get full media URL
            const primaryFile = `${BASE_URL}/${singlePath}`;

            getVideoMeta(primaryFile)
                .then((videoMeta) => {
                    // TODO: pick random hue?
                    const data = {
                        backgroundHue: 20,
                        backgroundPath: backgroundFile,
                        category,
                        contentRating: '',
                        description: '',
                        duration: videoMeta ? secondsToDuration(videoMeta.duration) : '00:00:00',
                        filePath: primaryFile,
                        genres: [],
                        // imdb
                        name: toName(getFileName(singlePath)),
                        posterPath: posterFile,
                        resolution: videoMeta && videoMeta.width >= 1080 ? 'hd' : 'sd',
                        slug: toSlug(getFileName(singlePath)),
                        schema: '1.0',
                        // tmdb
                        // year
                        type: 'movie',
                    };

                    if (onSuccess) onSuccess(data);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error('generateMovieMeta error', error);
                    if (onFailure) onFailure(error);
                });
        }

        /**
         * Generate the meta.json file for a TV series media object.
         *
         * @param {array} fileIndex Array of file paths
         * @param {function} onSuccess If meta.json is generated successfully
         * @param {function} onFailure If there was an error generating meta.json
         */
        function generateTVMeta(fileIndex, onSuccess, onFailure) {
            const directories = fileIndex.map((item) => item.Key).filter((path) => path.endsWith('/'));

            // Get first directory in list, which is the root directory
            const rootDir = directories.shift().slice(0, -1);

            // Get the parent category from the path
            const category = rootDir.split('/')[0];

            // Get the media slug from the path
            const slug = rootDir.split('/')[1];

            const rootFiles = fileIndex
                .map((item) => item.Key)
                .filter((path) => !path.endsWith('/') && getPathDepth(path) === 2);
            const mediaFiles = fileIndex
                .map((item) => item.Key)
                .filter((path) => !path.endsWith('/') && getPathDepth(path) > 2);

            // Get the poster image file if it exists
            const posterFile = getPosterFile(rootFiles);

            // Get the background image file if it exists
            const backgroundFile = getBackgroundFile(rootFiles);

            Promise.all(directories.map((directory, index) => getSeason(directory, index, mediaFiles)))
                .then((seasons) => {
                    if (onSuccess)
                        onSuccess({
                            backgroundHue: 20,
                            backgroundPath: backgroundFile,
                            category,
                            contentRating: '',
                            description: '',
                            genres: [],
                            // imdb
                            name: toName(slug),
                            posterPath: posterFile,
                            // resolution
                            seasons,
                            slug,
                            schema: '1.0',
                            // tmdb
                            // year
                            type: 'tv',
                        });
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log('generateTVMeta error', error);
                    if (onFailure) onFailure(error);
                });
        }

        /**
         * Determine which kind of meta.json to generate, a Movie or TV series.
         *
         * @param {array} fileIndex Array of file paths
         * @param {function} onSuccess If meta.json generated
         * @param {function} onFailure If meta.json failed to generate
         */
        function generateWhich(fileIndex, onSuccess, onFailure) {
            // Look for a media file in the root, as opposed to within a season folder
            const singlePath = getSingleMedia(fileIndex);
            if (singlePath) {
                generateMovieMeta(singlePath, fileIndex, onSuccess, onFailure);
            } else {
                generateTVMeta(fileIndex, onSuccess, onFailure);
            }
        }

        // We pass null for onSuccess as useLocalStorage has already loaded the
        // data if it validates. We only worry if it didn't find it.
        loadCache(null, () => {
            // onError, call loadMeta
            loadMeta(onComplete, () => {
                // onError, call indexMeta
                indexMeta((fileIndex) => {
                    generateWhich(
                        fileIndex,
                        (data) => {
                            putJSON(keyPrefix, data);
                            onComplete(data);
                        },
                        onError
                    );
                }, onError);
            });
        });

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
