import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          id
          url
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
`;


export const GET_REPOSITORY = gql`
  query Repositories($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      url
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
`;