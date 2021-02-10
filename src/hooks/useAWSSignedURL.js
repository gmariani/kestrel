import { useEffect, useState } from 'react';
import S3 from 'aws-sdk/clients/s3';
import { getAWSBaseURL } from '../utils';

export default function useAWSSignedURL(rawKey, categorySlug, mediaSlug) {
    const [signedURL, setSignedURL] = useState('');
    const keyPrefix = `${categorySlug}/${mediaSlug}/`;
    // TODO: Figure out what to do if you pause and come back after the url expires
    // or if you drop internet connection longer than the lifetime.

    // Is this old style URL or new style (without prefix)?
    const key = !rawKey.includes(mediaSlug) ? `${keyPrefix}${rawKey}` : rawKey;

    useEffect(() => {
        const BASE_URL = getAWSBaseURL();
        const objectKey = String(key).replace(`${BASE_URL}/`, '');
        const S3_CLIENT = new S3({
            apiVersion: '2006-03-01',
            region: process.env.REACT_APP_AWS_DEFAULT_REGION,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            },
            params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
        });

        S3_CLIENT.getSignedUrlPromise('getObject', {
            Bucket: process.env.REACT_APP_AWS_BUCKET,
            Key: objectKey,
            Expires: 60 * 60 * 3, // 3 hours
        }).then(
            (url) => {
                setSignedURL(url);
            },
            (err) => {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        );
    }, [key]);

    return signedURL;
}
