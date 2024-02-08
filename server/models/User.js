const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const Cuisine = require("./Cuisine");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        username: String,
      },
    ],
    favorites: [
      {
        businessId: String,
        name: String,
        rating: Number,
        image: String,
        url: String,
        location: String,
      },
    ],
    savedCuisines: [
      {
        name: String,
        cuisineId: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

userSchema.virtual("favoriteCount").get(function () {
  return this.favorites.length;
});

const User = model("User", userSchema);

module.exports = User;
