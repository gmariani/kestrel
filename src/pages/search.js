import React, { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components/macro';
import S3 from 'aws-sdk/clients/s3';
import { useAWSCategories } from '../hooks';
import { DefaultContainer, FadeBackground, Loading, FlexContainer } from '../components';
import { HeaderContainer, SearchContainer, SearchResultsContainer } from '../containers';

const Container = styled(DefaultContainer)`
    padding-top: 2.25rem;
    padding-bottom: 0 !important;
    padding-left: 4.25rem;
    padding-right: 4.25rem;
`;

const Row = styled(FlexContainer)`
    max-height: 100%;
    padding-bottom: 4rem;
`;
// BUG: Can't navigate to results via keyboard
export default function Search() {
    const data = useRef([]);
    const [isReady, setIsReady] = useState(false);
    const [searchResult, setSearchResults] = useState([]);
    const { categories } = useAWSCategories();

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

    // Grab the media list from each category
    useEffect(() => {
        categories.forEach((category) => {
            if (!data.current[category]) {
                // console.log(`grab data for ${category}`, data.current);
                data.current[category] = 'pending';
                s3Client
                    .listObjectsV2({ Delimiter: '/', Prefix: `${category}/` })
                    .promise()
                    .then((results) => {
                        data.current[category] = results.CommonPrefixes.map((item) =>
                            item.Prefix.replace(category, '').slice(0, -1).slice(1)
                        );

                        // If all data is not pending
                        if (!data.current.includes('pending')) {
                            // console.log('All done!', data.current);
                            setIsReady(true);
                        }
                    })
                    .catch((error) => {
                        data.current[category] = 'error';
                        // eslint-disable-next-line no-console
                        console.error(error, error.stack);

                        // If all data is not pending
                        if (!data.current.includes('pending')) {
                            // console.log('All done (with errors)!');
                            setIsReady(true);
                        }
                    });
            }
        });
    }, [s3Client, categories, data]);

    return (
        <>
            <Container>
                <HeaderContainer categories={categories} selectedCategory='search' />
                {isReady ? (
                    <Row flexDirection='row'>
                        <SearchContainer data={data} onRefresh={setSearchResults} />
                        <SearchResultsContainer results={searchResult} />
                    </Row>
                ) : (
                    <Loading />
                )}
            </Container>
            <FadeBackground hue={11.2} base='#182848' split={100} />
        </>
    );
}
