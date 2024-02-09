import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query {
    allUsers {
      _id
      username
      friends {
        _id
        username
      }
      favorites {
        businessId
        name
        rating
        image
        url
        location
      }
      savedCuisines {
        name
        cuisineId
      }
    }
  }
`;

export const QUERY_USER_BY_USERNAME = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      friends {
        _id
        username
      }
      favorites {
        businessId
        name
        rating
        image
        url
        location
      }
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
        _id
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
