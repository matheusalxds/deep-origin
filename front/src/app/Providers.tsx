'use client';
import { ApolloProvider } from '@apollo/client';
import { type PropsWithChildren } from 'react';
import { apolloClient } from '@/api/apollo-client';

type ProviderProps = PropsWithChildren;

export default function Providers({ children }: ProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
