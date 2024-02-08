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

export const ADD_FAVORITE = gql`
  mutation addFavorite($restaurantData: RestaurantInput!) {
    addFavorite(restaurantData: $restaurantData) {
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
