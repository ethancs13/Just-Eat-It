import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CUISINE = gql`
  mutation addCuisine($cuisineData: [CuisineInput!]) {
    addCuisine(cuisineData: $cuisineData) {
      _id
      username
      savedCuisines {
        cuisineId
        name
      }
    }
  }
`;

export const REMOVE_CUISINE = gql`
  mutation removeCuisine($cuisineData: CuisineInput!) {
    removeCuisine(cuisineData: $cuisineData) {
      _id
      username
      savedCuisines {
        cuisineId
        name
      }
    }
  }
`;

export const CREATE_RESTAURANT = gql`
  mutation createRestaurant(
    $businessId: String!
    $name: String!
    $rating: Float!
    $image: String
    $url: String
    $location: String
  ) {
    createRestaurant(
      businessId: $businessId
      name: $name
      rating: $rating
      image: $image
      url: $url
      location: $location
    )
  }
`;
