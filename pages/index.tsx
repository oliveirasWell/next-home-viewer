import { FC } from 'react'
import { GlobalStyle } from '../components/GlobalStyle'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ApolloProvider } from '@apollo/client'
import client from '../configs/apollo-client'
import { Home } from '../components/Home'

const queryClient = new QueryClient()

const HomeContainer: FC = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  </QueryClientProvider>
)

export default HomeContainer
