import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { device } from '../../common/styles/mediaQueries';
import { colors } from '../../common/styles/variables';
import { Loading } from '../../components/loading/Loading';
import { UserProfile } from '../../components/profile/UserProfile';
import { Repository } from '../../components/repository/Repository';
import { Arrow } from '../../components/icons/Arrow';
import { OrderDirection } from '../../generated/graphql';
import { ErrorMessage } from '../../components/error-message/ErrorMessage';
import { useUserDetailsQuery } from './useUserDetailsQuery';

interface RouteParams {
    userLogin: string;
}

export const UserDetails: React.FunctionComponent = () => {
    const { userLogin } = useParams<RouteParams>();
    const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Asc);
    const { data, loading, error, fetchMoreHandler } = useUserDetailsQuery({
        login: userLogin,
        direction: orderDirection,
    });

    const isOrderDirectionAsc = orderDirection === OrderDirection.Asc;
    const orderDirectionToggle = () => {
        if (isOrderDirectionAsc) {
            setOrderDirection(OrderDirection.Desc);
        } else {
            setOrderDirection(OrderDirection.Asc);
        }
    };

    const loadMoreHandler = () => {
        fetchMoreHandler({
            direction: orderDirection,
            cursor: user.repositories.pageInfo.endCursor,
        });
    };

    if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
    if (!data && loading) return <Loading />;
    if (!data) return <p>Not found</p>;
    const { user } = data;

    return (
        <Wrapper>
            <UserProfile login={user.login} name={user.name} avatarUrl={user.avatarUrl} websiteUrl={user.websiteUrl} />
            <List>
                <Filtes>
                    <SortOrderButton onClick={orderDirectionToggle}>
                        <Label>Name</Label>
                        <Arrow isUp={isOrderDirectionAsc} />
                    </SortOrderButton>
                </Filtes>
                {user.repositories.edges.map((edge, index) => {
                    const { url, name, description, primaryLanguage } = edge.node;

                    return (
                        <Repository
                            key={index}
                            url={url}
                            name={name}
                            description={description}
                            primaryLanguage={primaryLanguage}
                        />
                    );
                })}
                {loading && <Loading />}
                {user.repositories.pageInfo.hasNextPage && !loading && (
                    <LoadMoreWrapper>
                        <LoadMore type='button' disabled={loading} onClick={loadMoreHandler}>
                            Load More
                        </LoadMore>
                    </LoadMoreWrapper>
                )}
            </List>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    padding: 4rem 0;
    flex-direction: column;

    & > div {
        margin-bottom: 4rem;
    }

    @media ${device.hasMediumDevice} {
        flex-direction: row;
    }
`;

const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
    width: 100%;
`;

const Filtes = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const SortOrderButton = styled.button`
    display: flex;
    align-items: center;

    height: 1.5rem;
    padding-left: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    border: none;
    background: none;
    box-shadow: none;
`;

const Label = styled.div`
    margin-right: 0.5rem;
`;

const LoadMoreWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const LoadMore = styled.button`
    border: 1px solid ${colors.primary.accent};
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 1rem;
`;
