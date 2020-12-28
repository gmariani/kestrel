import { useEffect, useState } from 'react';
import S3 from 'aws-sdk/clients/s3';
// TODO: ALlow this to switch based on datasource

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

export default async function getMetaJSON(prefix) {
    const s3Client = new S3({
        apiVersion: '2006-03-01',
        region: process.env.REACT_APP_AWS_DEFAULT_REGION,
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        },
        params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
    });

    const jsonURL = `${prefix}meta.json`;
    const isValidUrl = await isUrlFound(jsonURL);
    if (isValidUrl) {
        fetch(jsonURL)
            .then((res) => res.json())
            .then(
                (result) => {
                    return {
                        isLoaded: true,
                        data: result,
                    };
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    return {
                        isLoaded: true,
                        error,
                    };
                }
            );
    } else {
        return {
            isLoaded: true,
            error: { message: "File doesn't exist" },
        };
    }
}
