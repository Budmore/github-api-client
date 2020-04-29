import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Loading } from '../components/loading/Loading';
import { UserProfile } from '../components/profile/UserProfile';
import { colors } from '../common/styles/variables';
// import { Reposiotry } from '../components/repository/Repository';

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
                    <Item key={index}>
                        <TitleLink href={repository.url} title='Link to the repository'>
                            {repository.name} lorem ipsum dolor sita maet asd aydafdasd asdf adsf fasdf
                        </TitleLink>
                        <Description>{repository.description}</Description>
                        {repository.primaryLanguage && (
                            <Summary>
                                <Dot bgColor={repository.primaryLanguage.color} />
                                <ProgramingLanguage>{repository.primaryLanguage.name}</ProgramingLanguage>
                            </Summary>
                        )}
                    </Item>
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

const Item = styled.li`
    margin-bottom: 1rem;
    border: 1px solid #d1d5da;
    padding: 1rem;
    border-radius: 0.25rem;
`;

const TitleLink = styled.a`
    display: block;
    color: ${colors.primary.accent};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Description = styled.p``;

const Dot = styled.div<{ bgColor: string }>`
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    margin-right: 0.5rem;
    background-color: ${props => (props.bgColor ? props.bgColor : colors.secondary.greyLvl1)};
`;

const Summary = styled.div`
    display: flex;
`;

const ProgramingLanguage = styled.div`
    color: ${colors.primary};
    font-size: 0.8rem;
`;
