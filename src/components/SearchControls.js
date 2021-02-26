import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Keyboard from './Keyboard';
import Input from './Input';
import FlexContainer from './FlexContainer';

const Container = styled(FlexContainer)`
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    width: 33.333%;
    align-items: center;
`;

const propTypes = {
    data: PropTypes.shape({ current: PropTypes.obj }),
    onRefresh: PropTypes.func,
};

function SearchControls({ data, onRefresh }) {
    const inputRef = useRef();

    const refreshSearch = () => {
        const input = inputRef.current;
        const query = input.value.toLowerCase();

        // Flatten the associative array
        const list = Object.keys(data.current).reduce((r, category) => {
            const categoryArray = data.current[category].map((mediaSlug) => `${category}/${mediaSlug}`);
            return r.concat(categoryArray);
        }, []);

        // TODO: use fuse.js for fuzzy search

        // Don't search for anything until we hit 3 characters
        const result = query.length > 2 ? list.filter((item) => item.indexOf(query) > -1) : [];
        onRefresh(result);
    };

    const searchHandler = () => {
        // TODO: throttle event handler
        refreshSearch();
    };

    const keyHandler = (value) => {
        const input = inputRef.current;
        input.value += value;
        refreshSearch();
    };

    const deleteHandler = () => {
        const input = inputRef.current;
        input.value = input.value.slice(0, -1);
        refreshSearch();
    };

    return (
        <Container flexDirection='column'>
            <Input ref={inputRef} onChange={searchHandler} style={{ marginBottom: '3rem' }} />
            <Keyboard autoRestoreFocus onType={(letter) => keyHandler(letter)} onDelete={deleteHandler} />
        </Container>
    );
}

SearchControls.propTypes = propTypes;
export default SearchControls;
