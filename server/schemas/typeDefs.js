const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Cuisine {
    name: String!
  }

  type Restaurant {
    businessId: String!
    name: String!
    rating: Float!
    image: String
    details: String
    url: String
    coordinates: String
    cuisine: [Cuisine]!
  }

  type User {
    _id: ID!
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
    allUsers: [User]!
    user(id: ID!): User

    allRestaurants: [Restaurant]!
    restaurant(id: ID!): Restaurant

    allCuisines: [Cuisine]!
    cuisine(name: String!): Cuisine
  }

  type Mutation {
    createUser(username: String!, password: String!): Auth

    createRestaurant(
      businessId: String!,
      name: String!,
      rating: Float!,
      image: String,
      details: String,
      url: String,
      coordinates: String,
      cuisines: [String]
    ): Restaurant

    createCuisine(name: String!, types: [String]!): Cuisine
  }
`;

module.exports = typeDefs;