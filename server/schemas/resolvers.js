const { User, Restaurant, Cuisine } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.dir(context.user);

      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw AuthenticationError;
    },

    allUsers: async () => {
      return await User.find({});
    },

    user: async (parent, { id }) => {
      return await User.findById(id);
    },

    allRestaurants: async () => {
      return await Restaurant.find({});
    },

    restaurant: async (parent, { id }) => {
      return await Restaurant.findById(id);
    },

    allCuisines: async () => {
      return await Cuisine.find({});
    },

    cuisine: async (parent, { id }) => {
      return await Cuisine.findById(id);
    },
  },

  Mutation: {
    login: async (parent, { username, password }) => {
      console.log(`The user's username is: ${username}`);
      const user = await User.findOne({ username });
      console.log(`*************************************`);
      console.log(user);
      console.log(`*************************************`);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      // Added for debugging
      console.log(`Here's the token: ${token}`);

      return { token, user };
    },

    createUser: async (parent, { username, password }) => {
      try {
        const user = await User.create({ username, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        return { error: error.message };
      }
    },

    createRestaurant: async (parent, { name, cuisineId }) => {
      // find cuisine from list
      const cuisine = await Cuisine.findById(cuisineId);

      // make new restaurant with cuisine found
      const restaurant = new Restaurant({ name, cuisine });
      await restaurant.save();
      return restaurant;
    },

    createCuisine: async (parent, { name }) => {
      const cuisine = new Cuisine({ name });
      await cuisine.save();
      return cuisine;
    },
  },

  User: {
    friends: async (parent) => {
      return await User.find({ _id: { $in: parent.friends } });
    },
    favorites: async (parent) => {
      return await Restaurant.find({ _id: { $in: parent.favorites } });
    },
    cuisine: async (parent) => {
      return await Cuisine.findById(parent.cuisine);
    },
  },

  Restaurant: {
    cuisine: async (parent) => {
      return await Cuisine.findById(parent.cuisine);
    },
  },
};

module.exports = resolvers;
