const { User, Restaurant, Cuisine } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { id }) => {
      return await User.findById(id);
    },
    restaurants: async () => {
      return await Restaurant.find({});
    },
    restaurant: async (parent, { id }) => {
      return await Restaurant.findById(id);
    },
    cuisines: async () => {
      return await Cuisine.find({});
    },
    cuisine: async (parent, { id }) => {
      return await Cuisine.findById(id);
    }
  },
  Mutation: {
    createUser: async (parent, { username, password }) => {
      const user = new User({ username, password });
      await user.save();
      return { token: user.generateJWT(), user };
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
    }
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
    }
  },
  Restaurant: {
    cuisine: async (parent) => {
      return await Cuisine.findById(parent.cuisine);
    }
  }
};

module.exports = resolvers;