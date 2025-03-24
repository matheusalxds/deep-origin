import { gql } from "@apollo/client";

export const M_SHORT_URLS = gql`
  mutation ShortUrl ($input: CreateShortUrl!){
    shortUrl(input: $input) {
      createdAt
      id
      shortUrl
    }
  }
`;
