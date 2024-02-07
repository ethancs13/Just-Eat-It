const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Cuisine {
    name: String!
    cuisineId: String!
  }

  type Restaurant {
    businessId: String!
    name: String!
    rating: Float!
    image: String
    url: String
    location: String
    cuisine: [Cuisine]!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    friends: [User]!
    favorites: [Restaurant]!
    savedCuisines: [Cuisine]
    friendCount: Int
    favoriteCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User

    allUsers: [User]!
    user(id: ID!): User

    allRestaurants: [Restaurant]!
    restaurant(id: ID!): Restaurant

    allCuisines: [Cuisine]!
    cuisine(name: String!): Cuisine
  }

  input CuisineInput {
    name: String
    cuisineId: String
<<<<<<< HEAD
  }

  input RestaurantInput {
    businessId: String!
    name: String!
    rating: Float!
    image: String
    url: String
    location: String
    cuisine: [CuisineInput]!
=======
>>>>>>> 9f8cbb163f378cd52fac6f6ca1cff1e0a7f13cb7
  }

  type Mutation {
    createUser(username: String!, password: String!): Auth

    login(username: String!, password: String!): Auth

    addCuisine(cuisineData: [CuisineInput!]): User

    removeCuisine(cuisineId: ID!): User

    createRestaurant(
      businessId: String!
      name: String!
      rating: Float!
      image: String
      url: String
      location: String
    ): Restaurant

    removeRestaurant(businessId: String!): User
  }
`;

module.exports = typeDefs;
