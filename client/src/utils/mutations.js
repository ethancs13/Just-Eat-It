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
  mutation addCuisine($cuisineData: CuisineInput!) {
    addCuisine(cuisineData: $cuisineData) {
      _id
      username
    }
  }
`;

export const REMOVE_CUISINE = gql`
  mutation removeCuisine($cuisineData: CuisineInput!) {
    removeCuisine(cuisineData: $cuisineData) {
      _id
      username
      cuisine {
        _id
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
    ) {
      businessId
      name
      rating
      image
      url
      location
    }
  }
`;

export const REMOVE_RESTAURANT = gql`
  mutation RemoveRestaurant($businessId: String!) {
    RemoveRestaurant(businessId: $businessId) {
      _id
      username
      favorites {
        businessId
        name
        rating
        image
        url
        location
      }
    }
  }
`;
