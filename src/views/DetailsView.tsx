import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Loading } from '../components/loading/Loading';
import { UserProfile } from '../components/profile/UserProfile';
import { Reposiotry } from '../components/repository/Repository';
import { Arrow } from '../components/icons/Arrow';

const GET_ACCOUNT_DETAILS = gql`
    query detailsView($login: String!, $direction: OrderDirection!) {
        user(login: $login) {
            id
            name
            avatarUrl
            websiteUrl
            repositories(orderBy: { field: NAME, direction: $direction }, first: 5) {
                nodes {
                    name
                    url
                    description
                    primaryLanguage {
                        name
                        color
                    }
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
    direction: SortDirection;
}

enum SortKey {
    Name = 'Name',
}

enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

const DEFAULT_SORT_CONFIG: SortConfig = {
    key: SortKey.Name,
    direction: SortDirection.DESC,
};

export const DetailsView: React.FunctionComponent<DetailsViewProps> = props => {
    const routeParam: RouteParams = useParams();
    const login = props.login || routeParam.login;
    const [sortConfig, setSortConfig] = useState(DEFAULT_SORT_CONFIG);
    const { data, loading, error } = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { login, direction: sortConfig.direction },
    });

    const sortDirectionToggle = () => {
        const newSortConfig = {
            ...sortConfig,
            direction: sortConfig.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC,
        };
        setSortConfig(newSortConfig);
    };

    if (error) return <p>ERROR: {error.message}</p>;
    if (!data && loading) return <Loading />;
    if (!data) return <p>Not found</p>;

    return (
        <Wrapper>
            <UserProfile
                login={login}
                name={data.user.name}
                avatarUrl={data.user.avatarUrl}
                websiteUrl={data.user.websiteUrl}
            />
            <List>
                <SortOrder onClick={sortDirectionToggle}>
                    <Label>{sortConfig.key}</Label>
                    <Arrow isUp={sortConfig.direction === SortDirection.ASC} />
                </SortOrder>
                {data.user.repositories.nodes.map((repository, index) => (
                    <Reposiotry key={index} {...repository} />
                ))}
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
