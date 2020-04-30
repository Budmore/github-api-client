import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AccountProfileFragment, AccountProfileProps } from '../../components/account/AccountProfile';
import { RepositoryFragment, RepositoryProps } from '../../components/repository/Repository';

const LIST_SIZE_DEFAULT = 5;
const GET_ACCOUNT_DETAILS = gql`
    query userDetails($login: String!, $direction: OrderDirection!, $cursor: String, $listSize: Int!) {
        user(login: $login) {
            ...AccountProfileFragment
            repositories(orderBy: { field: NAME, direction: $direction }, first: $listSize, after: $cursor) {
                edges {
                    cursor
                    node {
                        ...RepositoryFragment
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
    ${AccountProfileFragment}
    ${RepositoryFragment}
`;

export enum OrderDirection {
    Asc = 'Asc',
    Desc = 'Desc',
}

export interface UserDetailsQuery {
    user: AccountProfileProps & {
        repositories: {
            edges: {
                cursor: string;
                node: RepositoryProps;
            }[];
            pageInfo: {
                endCursor: string;
                hasNextPage: boolean;
            };
        };
    };
}

export interface UserDetailsQueryVariables {
    login: string;
    direction: OrderDirection;
    cursor?: string | null;
    listSize?: number;
}

export const useUserDetailsQuery = ({ login, direction }: UserDetailsQueryVariables) => {
    const { data, loading, error, fetchMore } = useQuery<UserDetailsQuery, UserDetailsQueryVariables>(
        GET_ACCOUNT_DETAILS,
        {
            variables: {
                login,
                direction,
                cursor: null,
                listSize: LIST_SIZE_DEFAULT,
            },
            notifyOnNetworkStatusChange: true,
        },
    );

    const fetchMoreHandler = ({ login, direction, cursor }: UserDetailsQueryVariables) => {
        fetchMore({
            query: GET_ACCOUNT_DETAILS,
            variables: {
                login,
                direction,
                cursor,
                listSize: LIST_SIZE_DEFAULT,
            },

            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                return {
                    user: {
                        ...prev.user,
                        repositories: {
                            ...prev.user.repositories,
                            edges: [...prev.user.repositories.edges, ...fetchMoreResult.user.repositories.edges],
                            pageInfo: fetchMoreResult.user.repositories.pageInfo,
                        },
                    },
                };
            },
        });
    };

    return {
        data,
        loading,
        error,
        fetchMoreHandler,
    };
};
