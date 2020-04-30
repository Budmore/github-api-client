import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AccountPreviewFragment, AccountPreviewProps } from '../../components/account/AccountPreview';

const SEARCH_ACCOUNT_BY_LOGIN = gql`
    query search($query: String!) {
        search(query: $query, type: USER, last: 3) {
            nodes {
                ...AccountPreviewFragment
            }
            userCount
        }
    }
    ${AccountPreviewFragment}
`;

export interface SearchQuery {
    search: {
        nodes: AccountPreviewProps[];
        userCount: number;
    };
}

export interface SearchQueryVariables {
    query: string;
}

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
