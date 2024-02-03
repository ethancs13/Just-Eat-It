const db = require('../config/connection');
const { User, Restaurant, Cuisine } = require('../models');

const userSeeds = require('./userSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');
const cuisineSeeds = require('./cuisineSeeds.json');

const cleanDB = require('./cleanDB');

db.once('open', async () => {

  try {
    // clean database
    await cleanDB('User', 'users');
    await cleanDB('Restaurant', 'restaurants');
    // await cleanDB('Cuisine', 'cuisines');

    // seed Users ...
    await User.create(userSeeds);
    console.log('User Data Seeded.')

    // seed Restaurants ...
    await Restaurant.create(restaurantSeeds);
    console.log('Restaurant Data Seeded.')

    // seed Cuisines ...
    await Cuisine.create(cuisineSeeds);
    console.log("Cuisine Data Seeded.")



    // complete
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
