import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query allUsers {
    _id
    username
    savedCuisines {
      name
      cuisineId
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      savedCuisines {
        name
        cuisineId
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedCuisines {
        name
        cuisineId
      }
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

export const QUERY_ALL_CUISINES = gql`
  query {
    allCuisines {
      name
      cuisineId
    }
  }
`;
