import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
      id
      user {
        id
        username
      }
      repository {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        stargazersCount
        watchersCount
        forksCount
        url
        ownerAvatarUrl
        description
        language  
      }
      repositoryId
      rating
      createdAt
      text
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      createdAt
      reviewCount
    }
  }
`

export const DELETE = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`