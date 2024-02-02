const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Cuisine {
    id: ID!
    name: String!
  }

  type Restaurant {
    id: ID!
    name: String!
    rating: Float!
    image: String
    cuisine: Cuisine!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    friends: [User]!
    favorites: [Restaurant]!
    cuisine: [Cuisine]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    restaurants: [Restaurant]!
    restaurant(id: ID!): Restaurant
    cuisines: [Cuisine]!
    cuisine(id: ID!): Cuisine
  }

  type Mutation {
    createUser(username: String!, password: String!): Auth
    createRestaurant(
      name: String!
      rating: Float!
      image: String
      cuisineId: ID!
    ): Restaurant
    createCuisine(name: String!): Cuisine
  }
`;

module.exports = typeDefs;
