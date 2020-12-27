import { useEffect, useState } from 'react';
import S3 from 'aws-sdk/clients/s3';

export default function useAWSCategoryMedia() {
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

    const getMeta = (prefix) => {
        // Requires atleast two slashes
        // Requires s3:ListBucket
        return s3Client
            .getObject({ Key: `${prefix}/meta.json` })
            .promise()
            .then((data) => {
                console.log('getMeta', data);
                return data;
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error, error.stack);
                return null;
            });
    };

    const setMeta = (prefix, data) => {
        // Requires atleast two slashes
        // Requires s3:ListBucket
        return s3Client
            .putObject({
                Key: `${prefix}/meta.json`,
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

    return [getMeta, setMeta];
}
