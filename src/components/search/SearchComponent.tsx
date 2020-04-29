import React, { useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../common/hooks/useDebounce';

const SEARCH_DEBOUNCE_MS = 300;

export interface SearchComponentProps {
    runSearch?: (query: string) => void;
}

export const SearchComponent: React.FunctionComponent<SearchComponentProps> = () => {
    const [query, setQuery] = useState('');

    useDebounce(
        () => {
            console.log('serach', query);
        },
        SEARCH_DEBOUNCE_MS,
        [query],
    );

    const updateQuery = event => {
        setQuery(event.target.value);
    };

    return (
        <Wrapper>
            <h1>Find a Github user</h1>
            <Input onChange={updateQuery} value={query} placeholder='Start typing' />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Input = styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    font-size: 1rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`;
