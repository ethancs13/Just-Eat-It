const db = require('../config/connection');
const { User, Restaurant, Cuisine } = require('../models');

const userSeeds = require('./userSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');
const cuisineSeeds = require('./cuisineSeeds.json');

const cleanDB = require('./cleanDB');

db.once('open', async () => {

  try {
    // clean cuisine
    await cleanDB('Cuisine', 'cuisines')
      .then((err) => {
        err ? console.log("Error: ", err) :
          console.log(`---------------------\nCuisine data sanitized`,
          )
      })
    // clean restaurant
    await cleanDB('Restaurant', 'restaurants')
      .then((err) => {
        err ? console.log("Error: ", err) :
          console.log("Restaurant data sanitized",
          )
      })
    // clean user
    await cleanDB('User', 'users')
      .then((err) => {
        err ? console.log("Error: ", err) :
          console.log(`User data sanitized \n`,
          )
      })



    // seed Cuisines 
    await Cuisine.create(cuisineSeeds);
    console.log(`---------------------\nCuisine Data Seeded.`)

    // seed Restaurants 
    await Restaurant.create(restaurantSeeds);
    console.log('Restaurant Data Seeded.')

    // seed Users 
    await User.create(userSeeds);
    console.log('User Data Seeded.')

    // complete
    console.log(`\nall done!`);
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
