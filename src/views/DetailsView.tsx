import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Loading } from '../components/loading/Loading';
import { UserProfile } from '../components/profile/UserProfile';
import { Repository } from '../components/repository/Repository';
import { Arrow } from '../components/icons/Arrow';
import { DetailsViewQueryVariables, DetailsViewQuery, OrderDirection } from '../__generated__/graphql';

const GET_ACCOUNT_DETAILS = gql`
    query detailsView($login: String!, $direction: OrderDirection!, $cursor: String) {
        user(login: $login) {
            id
            name
            avatarUrl
            websiteUrl
            repositories(orderBy: { field: NAME, direction: $direction }, first: 2, after: $cursor) {
                edges {
                    cursor
                    node {
                        name
                        url
                        description
                        primaryLanguage {
                            name
                            color
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;

interface RouteParams {
    login: string;
}

interface DetailsViewProps {
    login?: string;
}

interface SortConfig {
    key: SortKey;
    direction: OrderDirection;
}

enum SortKey {
    Name = 'Name',
}

const DEFAULT_SORT_CONFIG: SortConfig = {
    key: SortKey.Name,
    direction: OrderDirection.Asc,
};

export const DetailsView: React.FunctionComponent<DetailsViewProps> = props => {
    const routeParam: RouteParams = useParams();
    const login = props.login || routeParam.login;
    const [sortConfig, setSortConfig] = useState(DEFAULT_SORT_CONFIG);
    const { data, loading, error, fetchMore } = useQuery<DetailsViewQuery, DetailsViewQueryVariables>(
        GET_ACCOUNT_DETAILS,
        {
            variables: { login, direction: sortConfig.direction, cursor: null },
            notifyOnNetworkStatusChange: true,
        },
    );

    const sortDirectionToggle = () => {
        const newSortConfig = {
            ...sortConfig,
            direction: sortConfig.direction === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc,
        };
        setSortConfig(newSortConfig);
    };

    const loadMoreHandler = () => {
        fetchMore({
            query: GET_ACCOUNT_DETAILS,
            variables: {
                login,
                direction: sortConfig.direction,
                cursor: user.repositories.pageInfo.endCursor,
            },

            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                const { repositories } = fetchMoreResult.user;

                return {
                    user: {
                        ...prev.user,
                        repositories: {
                            ...prev.user.repositories,
                            edges: [...prev.user.repositories.edges, ...repositories.edges],
                            pageInfo: repositories.pageInfo,
                        },
                    },
                };
            },
        });
    };

    if (error) return <p>ERROR: {error.message}</p>;
    if (!data && loading) return <Loading />;
    if (!data) return <p>Not found</p>;
    const { user } = data;

    return (
        <Wrapper>
            <UserProfile login={login} name={user.name} avatarUrl={user.avatarUrl} websiteUrl={user.websiteUrl} />
            <List>
                <SortOrder onClick={sortDirectionToggle}>
                    <Label>{sortConfig.key}</Label>
                    <Arrow isUp={sortConfig.direction === OrderDirection.Asc} />
                </SortOrder>
                {user.repositories.edges.map((edge, index) => (
                    <Repository key={index} {...edge.node} />
                ))}
                {loading && <Loading />}
                {user.repositories.pageInfo.hasNextPage && (
                    <LoadMore type='button' disabled={loading} onClick={loadMoreHandler}>
                        Load More
                    </LoadMore>
                )}
            </List>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    padding: 4rem 0;
`;

const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
    width: 100%;
`;

const SortOrder = styled.button`
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding-left: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    border: none;
    box-shadow: none;
`;

const Label = styled.div`
    margin-right: 0.5rem;
`;
const LoadMore = styled.button``;
