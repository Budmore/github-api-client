import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { device } from '../../styles/mediaQueries';
import { colors } from '../../styles/variables';
import { Loading } from '../../components/loading/Loading';
import { AccountProfile } from '../../components/account/AccountProfile';
import { Repository } from '../../components/repository/Repository';
import { Arrow } from '../../components/icons/Arrow';
import { ErrorMessage } from '../../components/error-message/ErrorMessage';
import { useUserDetailsQuery, OrderDirection } from './useUserDetailsQuery';

interface RouteParams {
    userLogin: string;
}

export const UserDetails: React.FunctionComponent = () => {
    const { userLogin } = useParams<RouteParams>();
    const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.ASC);
    const { data, loading, error, fetchMoreHandler } = useUserDetailsQuery({
        login: userLogin,
        direction: orderDirection,
    });

    const isOrderDirectionAsc = orderDirection === OrderDirection.ASC;
    const orderDirectionToggle = () => {
        if (isOrderDirectionAsc) {
            setOrderDirection(OrderDirection.DESC);
        } else {
            setOrderDirection(OrderDirection.ASC);
        }
    };

    const loadMoreHandler = () => {
        fetchMoreHandler({
            login: userLogin,
            cursor: user.repositories.pageInfo.endCursor,
            direction: orderDirection,
        });
    };

    if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
    if (!data && loading) return <Loading />;
    if (!data) return <p>Not found</p>;
    const { user } = data;

    return (
        <Wrapper>
            <AccountProfile
                login={user.login}
                name={user.name}
                avatarUrl={user.avatarUrl}
                websiteUrl={user.websiteUrl}
            />
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

    height: 2rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    border: none;
    background: none;
    box-shadow: none;
    cursor: pointer;

    &:hover {
        background-color: ${colors.secondary.greyLvl2};
    }
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
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: ${colors.secondary.greyLvl2};
    }
`;
