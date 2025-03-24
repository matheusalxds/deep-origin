import { gql } from '@apollo/client';
import { Query } from '../../../__generated__/gql/graphql';

export const GET_SLUG = gql`
  query GetSlug($id: String!) {
    getSlug(id: $id)
  }
`;

export type GetSlugType = Query['getSlug'];
