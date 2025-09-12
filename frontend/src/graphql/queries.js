import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after:$after, first: $first){
      pageInfo {
        hasNextPage
        endCursor
      },
      edges {
        node {
          description,
          fullName,
          forksCount,
          id,
          language,
          ownerAvatarUrl,
          ratingAverage,
          reviewCount,
          stargazersCount
        }
      }
    }
  }
`

export const USER = gql`
  query {
    me {
      id
      username
      reviews {
        edges {
          node {
            id
            repository {
              id
              fullName
            }
              repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id,
      fullName,
      url,
      description,
      fullName,
      forksCount,
      language,
      ownerAvatarUrl,
      ratingAverage,
      reviewCount,
      stargazersCount,
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            repositoryId
            user {
              id,
              username,
            }
          }
          cursor
        }
      }
    }
  }
`