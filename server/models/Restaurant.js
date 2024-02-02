const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  cuisine: { type: Schema.Types.ObjectId, ref: 'Cuisine' }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;