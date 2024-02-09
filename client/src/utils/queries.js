import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query allUsers {
    allUsers {
      _id
      username
      savedCuisines {
        name
        cuisineId
      }
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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
      friends {
        username
      }
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