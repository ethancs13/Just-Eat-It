import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query allUsers {
    _id
    username
    cuisine
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      cuisine
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      cuisine
    }
  }
`;
