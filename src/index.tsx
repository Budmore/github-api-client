import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import { GITHUB_USER_TOKEN } from '../config';
import { DetailsView } from './views/DetailsView';
import { SearchComponent } from './components/search/SearchComponent';
import { Container } from './components/layout/Container';

const inMemeryCache = new InMemoryCache();
const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${GITHUB_USER_TOKEN}`,
    },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: inMemeryCache,
    link: httpLink,
});

const Application = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Container>
                <SearchComponent />
                <Switch>
                    <Route path='/:login' component={DetailsView} />
                </Switch>
            </Container>
        </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(<Application />, document.getElementById('react-root'));
