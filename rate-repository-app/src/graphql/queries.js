import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          name
          language
          fullName
          forksCount
          description
          openIssuesCount
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
      createdAt
      reviewCount
    }
  }
`