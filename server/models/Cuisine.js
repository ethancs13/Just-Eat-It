const { Schema } = require('mongoose');

const cuisineSchema = new Schema(
{
  name: { 
    type: String, 
    required: true 
  },
}
);

module.exports = cuisineSchema;