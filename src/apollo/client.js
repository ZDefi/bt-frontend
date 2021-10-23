import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

// https://api.thegraph.com/subgraphs/name/babyswapgraph/exchange
// https://api.thegraph.com/subgraphs/name/babyswapgraph/blocks
// https://api.thegraph.com/subgraphs/name/babyswapgraph/pairs
// https://api.thegraph.com/subgraphs/name/babyswapgraph/prediction

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/babyswapgraph/exchange4',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/babyswapgraph/blocks',
  }),
  cache: new InMemoryCache(),
})

export default client
