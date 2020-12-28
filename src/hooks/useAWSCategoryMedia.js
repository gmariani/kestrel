import { useEffect, useState } from 'react';
import S3 from 'aws-sdk/clients/s3';

export default function useAWSCategoryMedia(category) {
    const [categoryMedia, setCategoryMedia] = useState([]);
    // TODO save results to context

    const baseURL = `https://${process.env.REACT_APP_AWS_BUCKET}.s3.${process.env.REACT_APP_AWS_DEFAULT_REGION}.amazonaws.com/`;

    useEffect(() => {
        const s3Client = new S3({
            apiVersion: '2006-03-01',
            region: process.env.REACT_APP_AWS_DEFAULT_REGION,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            },
            params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
        });

        // Requires s3:ListBucket
        s3Client.listObjectsV2({ Delimiter: '/', Prefix: category }, (error, data) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error(error, error.stack);
            } else {
                console.log(data);
                /*
                {
                    "categories": {
                        "IsTruncated": false,
                        "Contents": [],
                        "Name": "mariani-movies",
                        "Prefix": "",
                        "Delimiter": "/",
                        "MaxKeys": 1000,
                        "CommonPrefixes": [
                        {
                            "Prefix": "animation/"
                        },
                        ...
                        ],
                        "KeyCount": 4
                    }
                }
                */
                setCategoryMedia(data.CommonPrefixes.map((item) => item.Prefix.replace(category, '')));
            }
        });
    }, [category]);

    return { media: categoryMedia, category, baseURL };
}
