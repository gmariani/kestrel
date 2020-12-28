import { useEffect, useState } from 'react';
import S3 from 'aws-sdk/clients/s3';

export default function useAWSMedia(prefix) {
    const [meta, setMetadata] = useState({});

    // TODO save results to context
    const s3Client = new S3({
        apiVersion: '2006-03-01',
        region: process.env.REACT_APP_AWS_DEFAULT_REGION,
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        },
        params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
    });

    useEffect(() => {
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
            const jsonURL = `${prefix}meta.json`;
            const isValidUrl = await isUrlFound(jsonURL);
            if (isValidUrl) {
                fetch(jsonURL)
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            setMetadata({
                                isLoaded: true,
                                data: result,
                            });
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            setMetadata({
                                isLoaded: true,
                                error,
                            });
                        }
                    );
            } else {
                setMetadata({
                    isLoaded: true,
                    error: { message: "File doesn't exist" },
                });
            }
        }
        fetchData();
    }, [prefix]);

    const setMeta = (data) => {
        // Requires atleast two slashes
        // Requires s3:ListBucket
        return s3Client
            .putObject({
                Key: `${prefix}meta.json`,
                ContentType: 'json/text',
                Body: JSON.stringify(data),
            })
            .promise()
            .then((result) => {
                console.log('setMeta', result);
                return true;
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error, error.stack);
                return false;
            });
    };

    return [meta, setMeta];
}
