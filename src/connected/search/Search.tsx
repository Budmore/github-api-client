import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { colors } from '../../styles/variables';
import { IconGithub } from '../../components/icons/IconGithub';
import { ErrorMessage } from '../../components/error-message/ErrorMessage';
import { Autocomplete } from '../../components/autocomplete/Autocomplete';
import { useLazySearchQuery } from '../search/useLazySerachQuery';

const SEARCH_DEBOUNCE_MS = 300;

export const Search: React.FunctionComponent = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [isActive, setIsActive] = useState(false);
    const { data, loading, error, triggerQueryHandler } = useLazySearchQuery({ query });

    useDebounce(triggerQueryHandler, SEARCH_DEBOUNCE_MS, [query]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const onFocusHandler = () => {
        setIsActive(true);
    };

    const onBackdropClick = () => {
        setIsActive(false);
    };

    const clearSearch = () => {
        setQuery('');
        setIsActive(false);
        history.push('/');
    };

    return (
        <Wrapper>
            <Title>
                <NavLink to='/'>
                    <IconGithub />
                </NavLink>
                Search for a user
            </Title>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <InputWrapper>
                <Input onChange={onChangeHandler} onFocus={onFocusHandler} value={query} placeholder='Start typing' />
                {query && (
                    <ClearButton type='button' onClick={clearSearch}>
                        &times;
                    </ClearButton>
                )}
            </InputWrapper>
            {isActive && query && (
                <Autocomplete loading={loading} onBackdropClick={onBackdropClick} users={data && data.search.nodes} />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
`;

const Title = styled.h1`
    display: flex;
    align-items: center;

    svg {
        margin-right: 1rem;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    z-index: 10;
`;

const Input = styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    font-size: 1rem;
    color: ${colors.secondary.greyLvl0};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid ${colors.secondary.greyLvl1};
    border-radius: 0.25rem;
`;

const ClearButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 3rem;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.secondary.greyLvl1};
    cursor: pointer;

    &:hover,
    &:active {
        color: ${colors.primary.accent};
    }
`;
