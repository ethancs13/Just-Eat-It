const { Schema, model } = require('mongoose');

const cuisineSchema = require('./Cuisine');

const restaurantSchema = new Schema(
  {
  businessId: {
    type: String,
    required: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  location: {
    type: String,
  },
}
);

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;