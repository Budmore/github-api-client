import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { SearchQuery, SearchQueryVariables } from '../../generated/graphql';

const SEARCH_ACCOUNT_BY_LOGIN = gql`
    query search($query: String!) {
        search(query: $query, type: USER, last: 3) {
            nodes {
                ... on User {
                    __typename
                    login
                    name
                    avatarUrl
                }
            }
            userCount
        }
    }
`;

export const useLazySearchQuery = ({ query }: SearchQueryVariables) => {
    const [triggerQuery, { data, loading, error }] = useLazyQuery<SearchQuery, SearchQueryVariables>(
        SEARCH_ACCOUNT_BY_LOGIN,
        {
            variables: { query },
        },
    );

    const triggerQueryHandler = () => {
        if (query) {
            triggerQuery();
        }
    };

    return { data, loading, error, triggerQueryHandler };
};
