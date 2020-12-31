import { useEffect, useState, useRef, useMemo } from 'react';
import S3 from 'aws-sdk/clients/s3';

export default function useAWSCategoryMedia(category) {
    const [data, setData] = useState([]);
    const dataCategory = useRef(null);
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
        // Requires s3:ListBucket
        s3Client
            .listObjectsV2({ Delimiter: '/', Prefix: category })
            .promise()
            .then((results) => {
                // Update loaded category so we know which category this data is for
                dataCategory.current = category.slice(0, -1);
                setData(results.CommonPrefixes.map((item) => item.Prefix.replace(category, '').slice(0, -1)));
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error, error.stack);
            });
    }, [s3Client, category]);

    return { media: data, category: dataCategory.current };
}
