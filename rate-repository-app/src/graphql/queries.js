import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          createdAt
          name
          language
          url
          forksCount
          description
          openIssuesCount
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
      totalCount
    }
  }
`;


export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviewCount
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            repository {
              fullName
              id
            }
            user {
              username
            }
            createdAt
          }
        }
      }
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
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
