import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { UserProfileFragment } from '../../components/profile/UserProfile';
import { RepositoryFragment } from '../../components/repository/Repository';
import { DetailsViewQuery, DetailsViewQueryVariables } from '../../generated/graphql';

const LIST_SIZE_DEFAULT = 5;
const GET_ACCOUNT_DETAILS = gql`
    query detailsView($login: String!, $direction: OrderDirection!, $cursor: String, $listSize: Int!) {
        user(login: $login) {
            ...UserProfileFragment
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
    ${UserProfileFragment}
    ${RepositoryFragment}
`;

export const useUserDetailsQuery = ({ login, direction }) => {
    const { data, loading, error, fetchMore } = useQuery<DetailsViewQuery, DetailsViewQueryVariables>(
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

    const fetchMoreHandler = ({ cursor, direction }) => {
        fetchMore({
            query: GET_ACCOUNT_DETAILS,
            variables: {
                login,
                direction,
                cursor,
                listSize: LIST_SIZE_DEFAULT,
            },

            updateQuery: (prev: DetailsViewQuery, { fetchMoreResult }) => {
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

    return {
        data,
        loading,
        error,
        fetchMoreHandler,
    };
};
