import { gql } from '@apollo/client';

export const M_UPDATE_SLUG = gql`
  mutation UpdateSlug($id: String!, $shortUrl: String!) {
    updateSlug(id: $id, shortUrl: $shortUrl)
  }
`;
