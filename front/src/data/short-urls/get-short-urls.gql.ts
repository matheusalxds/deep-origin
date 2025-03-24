import { gql } from '@apollo/client';
import { ShortUrlsQuery } from '../../../__generated__/gql/graphql';

export const SHORT_URLS = gql`
  query ShortUrls {
    shortUrls(pagination: { take: 10, page: 1 }) {
      createdAt
      id
      shortUrl
    }
  }
`;

export type ShortUrlType = ShortUrlsQuery;
