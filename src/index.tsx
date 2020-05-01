import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import { Search } from './connected/search/Search';
import { UserDetails } from './connected/user-details/UserDetails';
import { Container } from './components/layout/Container';
import { GlobalStyle } from './styles/globalStyles';

const GITHUB_USER_TOKEN = process.env.GITHUB_USER_TOKEN;

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
            <GlobalStyle />
            <Container>
                <Search />
                <Switch>
                    <Route path='/:userLogin' component={UserDetails} />
                </Switch>
            </Container>
        </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(<Application />, document.getElementById('react-root'));
