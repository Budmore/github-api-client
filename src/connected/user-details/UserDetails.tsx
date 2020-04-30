import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Loading } from '../../components/loading/Loading';
import { UserProfile } from '../../components/profile/UserProfile';
import { Repository } from '../../components/repository/Repository';
import { Arrow } from '../../components/icons/Arrow';
import { OrderDirection } from '../../generated/graphql';
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

    if (error) return <p>{error.message}</p>;
    if (!data && loading) return <Loading />;
    if (!data) return <p>Not found</p>;
    const { user } = data;

    return (
        <Wrapper>
            <UserProfile login={user.login} name={user.name} avatarUrl={user.avatarUrl} websiteUrl={user.websiteUrl} />
            <List>
                <SortOrder onClick={orderDirectionToggle}>
                    <Label>Name</Label>
                    <Arrow isUp={isOrderDirectionAsc} />
                </SortOrder>
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
