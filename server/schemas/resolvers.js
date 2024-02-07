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

    createRestaurant: async (parent, { name, cuisineId }) => {
      // find cuisine from list
      const cuisine = await Cuisine.findById(cuisineId);

      // make new restaurant with cuisine found
      const restaurant = new Restaurant({ name, cuisine });
      await restaurant.save();
      return restaurant;
    },

    // addCuisine: async (parent, { cuisineData }, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id);
    //     const existingCusines = user.savedCuisines.map(
    //       (cuisine) => cuisine.cuisineId
    //     );

    //     const updatedCuisines = cuisineData.filter(
    //       (cuisine) => !existingCusines.includes(cuisine.cuisineId)
    //     );
    //     console.log("Added User Cuisines:", updatedCuisines);

    //     if (updatedCuisines.length > 0) {
    //       const updatedUser = await User.findByIdAndUpdate(
    //         { _id: context.user._id },
    //         { $push: { savedCuisines: updatedCuisines } },
    //         { new: true }
    //       );
    //       return updatedUser;
    //     } else {
    //       return user;
    //     }
    //   }
    //   throw AuthenticationError;
    // },

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

    removeCuisine: async (parent, { cuisineData }, context) => {
      if (context.user) {
        const user = await User.findById(con);
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCuisines: { cuisineId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
