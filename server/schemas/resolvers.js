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
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw AuthenticationError;
      }

      const token = signToken(user);

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

    addFriend: async (_, { friendData }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const existingFriends = user.friends.map((friend) => friend._id);

        console.log("friends: ", friendData);
        const updatedFriends = friendData.filter(
          (friend) => !existingFriends.includes(friend._id)
        );

        if (updatedFriends.length > 0) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { friends: updatedFriends } },
            { new: true }
          );
          return updatedUser;
        } else {
          throw new Error("Friend already exists");
        }
      }
      throw AuthenticationError;
    },

    createRestaurant: async (parent, { name, cuisineId }) => {
      // find cuisine from list
      const cuisine = await Cuisine.findById(cuisineId);

      // make new restaurant with cuisine found
      const restaurant = new Restaurant({ name, cuisine });
      await restaurant.save();
      return restaurant;
    },

    addFavorite: async (parent, { restaurantData }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const existingRestaurants = user.favorites.map(
          (restaurant) => restaurant.businessId
        );
        const updatedFavorites = restaurantData.filter(
          (restaurant) => !existingRestaurants.includes(restaurant.businessId)
        );
        console.log(updatedFavorites);
        if (updatedFavorites.length > 0) {
          const updatedFavorites = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { restaurantData: updatedFavorites } },
            { new: true }
          );
          return updatedFavorites;
        } else {
          return user;
        }
      }
      throw AuthenticationError;
    },

    addCuisine: async (parent, { cuisineData }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const existingCusines = user.savedCuisines.map(
          (cuisine) => cuisine.cuisineId
        );

        const updatedCuisines = cuisineData.filter(
          (cuisine) => !existingCusines.includes(cuisine.cuisineId)
        );
        console.log(updatedCuisines);

        if (updatedCuisines.length > 0) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedCuisines: updatedCuisines } },
            { new: true }
          );
          return updatedUser;
        } else {
          return user;
        }
      }
      throw AuthenticationError;
    },

    addCuisine: async (parent, { cuisineData }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        // Replace existing saved cuisines with the new ones
        user.savedCuisines = cuisineData;
        const updatedUser = await user.save();
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
