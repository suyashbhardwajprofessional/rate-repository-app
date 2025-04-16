import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      totalCount
      edges {
        node {
          id
          name
          language
          url
          forksCount
          fullName
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

export const GET_REPOSITORY_WITH_REVIEWS = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      name
      language
      forksCount
      description
      openIssuesCount
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;