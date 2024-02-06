const { Schema, model } = require("mongoose");

const cuisineSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: {
    type: String,
    required: true,
  },
});

const Cuisine = model("Cuisine", cuisineSchema);

module.exports = Cuisine;
