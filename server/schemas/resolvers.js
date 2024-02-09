const { User, Restaurant, Cuisine } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password");
        return userData;
      }
      throw AuthenticationError;
    },

    allUsers: async () => {
      try {
        return await User.find({});
      } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
      }
    },

    user: async (parent, { username }) => {
      return await User.findOne({ username });
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

    addFriend: async (parent, { friendData }, context) => {
      console.log(friendData);
      if (context.user) {
        try {
          const user = await User.findById(context.user._id);
          const existingFriend = user.friends.find(
            (friend) => friend._id === friendData._id
          );

          if (!existingFriend) {
            const updatedUser = await User.findByIdAndUpdate(
              context.user._id,
              { $push: { friends: friendData._id } },
              { new: true }
            );
            return updatedUser;
          } else {
            return user;
          }
        } catch (error) {
          throw new Error(`Failed to add friend: ${error.message}`);
        }
      } else {
        throw AuthenticationError;
      }
    },

    removeFriend: async (_, { username }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      try {
        // Find the current user
        const currentUser = await User.findById(context.user._id);
        if (!currentUser) {
          throw new Error("User not found.");
        }

        // Find the user to be removed as a friend
        const friendUser = await User.findOne({ username });
        if (!friendUser) {
          throw new Error("Friend not found.");
        }

        // Check if the friend is already in the current user's friends list
        const friendIndex = currentUser.friends.indexOf(friendUser._id);
        if (friendIndex === -1) {
          throw new Error("User is not a friend.");
        }

        // Remove the friend from the current user's friends list
        currentUser.friends.splice(friendIndex, 1);
        await currentUser.save();

        return currentUser;
      } catch (error) {
        throw new Error(`Failed to remove friend: ${error.message}`);
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

    addFavorite: async (parent, { restaurantData }, context) => {
      console.log(restaurantData);
      if (context.user) {
        const user = await User.findById(context.user._id);
        const existingRestaurant = user.favorites.find(
          (restaurant) => restaurant.businessId === restaurantData.businessId
        );

        if (!existingRestaurant) {
          const updatedFavorites = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { favorites: restaurantData } },
            { new: true }
          );
          return updatedFavorites;
        } else {
          return user;
        }
      }
      throw AuthenticationError;
    },

    removeFavorite: async (parent, { businessId }, context) => {
      console.log(businessId);
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: { businessId: businessId } } },
          { new: true }
        );
        return updatedUser;
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
