const { Schema, model } = require("mongoose");

const cuisineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cuisineId: {
    type: String,
    required: true,
  },
});

const Cuisine = model("Cuisine", cuisineSchema);

module.exports = Cuisine;
