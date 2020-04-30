import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useDebounce } from '../../common/hooks/useDebounce';
import { colors, animation } from '../../common/styles/variables';
import { Loading } from '../loading/Loading';
import { SlideInKeyframes } from '../../common/styles/animations';

const SEARCH_DEBOUNCE_MS = 300;

const SEARCH_ACCOUNT_BY_LOGIN = gql`
    query searchComponent($query: String!) {
        search(query: $query, type: USER, last: 3) {
            edges {
                node {
                    ... on User {
                        login
                        name
                        avatarUrl
                    }
                }
            }
            userCount
        }
    }
`;

export interface SearchComponentProps {
    runSearch?: (query: string) => void;
}

export const SearchComponent: React.FunctionComponent<SearchComponentProps> = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [triggerQuery, { data, loading, error }] = useLazyQuery(SEARCH_ACCOUNT_BY_LOGIN, {
        variables: { query },
    });

    useDebounce(
        () => {
            if (query) {
                triggerQuery();
            }
        },
        SEARCH_DEBOUNCE_MS,
        [query],
    );

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
            <h1>Search for a Github user</h1>
            <InputWrapper>
                <Input onChange={onChangeHandler} onFocus={onFocusHandler} value={query} placeholder='Start typing' />
                {query && (
                    <ClearButton type='button' onClick={clearSearch}>
                        &times;
                    </ClearButton>
                )}
            </InputWrapper>
            {error && <ErrorDescription>{error.message}</ErrorDescription>}
            {isActive && query && (
                <>
                    <Backdrop onClick={onBackdropClick} />
                    <Autocomplete>
                        {loading && <Loading />}

                        {!loading && data && (
                            <List>
                                {data.search.edges.map((edge, index) => (
                                    <Item key={index}>
                                        <NavLinkCustom to={`/${edge.node.login}`}>
                                            <AvatarMini src={edge.node.avatarUrl} alt={`Avatar of ${edge.node.name}`} />
                                            {edge.node.login} {edge.node.name && `- ${edge.node.name}`}
                                        </NavLinkCustom>
                                    </Item>
                                ))}
                            </List>
                        )}
                    </Autocomplete>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
`;
const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.2;
    z-index: 5;
    height: 100%;
    width: 100%;
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
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
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

const ErrorDescription = styled.p`
    color: ${colors.status.danger};
    font-size: 0.75rem;
`;

const Autocomplete = styled.div`
    position: absolute;
    bottom: 0;
    border-radius: 0.25rem;
    border: 1px solid ${colors.secondary.greyLvl2};
    background-color: #fff;
    padding: 1rem 0;
    width: 100%;
    transform: translateY(100%);
    box-sizing: border-box;
    z-index: 10;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    animation: ${SlideInKeyframes} 500ms ${animation.cubicBezier} forwards;
`;

const Item = styled.li`
    display: flex;
    margin: 0 0.5rem 0.5rem;

    align-items: center;
`;

const AvatarMini = styled.img`
    width: 2rem;
    height: 2rem;
    background-color: ${colors.secondary.greyLvl2};
    border-radius: 0.25rem;
    margin-right: 1rem;
`;

const NavLinkCustom = styled(NavLink)`
    color: ${colors.primary.accent};
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 1rem;
    transition: background-color 300ms ${animation.cubicBezier};

    &:hover {
        background-color: ${colors.secondary.greyLvl2};
    }

    &.active {
        font-weight: bold;
    }
`;
