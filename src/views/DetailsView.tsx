import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Loading } from '../components/loading/Loading';
import { UserProfile } from '../components/profile/UserProfile';
import { Reposiotry } from '../components/repository/Repository';

const GET_ACCOUNT_DETAILS = gql`
    query detailsView($login: String!) {
        user(login: $login) {
            id
            name
            avatarUrl
            websiteUrl
            repositories(last: 10) {
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

export const DetailsView: React.FunctionComponent<DetailsViewProps> = props => {
    const routeParam: RouteParams = useParams();
    const login = props.login || routeParam.login;
    const { data, loading, error } = useQuery(GET_ACCOUNT_DETAILS, { variables: { login } });

    if (loading) return <Loading />;
    if (error) return <p>ERROR: {error.message}</p>;
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
