const axios = require("axios");

const instance = axios.create({
  baseURL: "https://just-eat-it-be3958285291.herokuapp.com/",
  headers: {
    Authorization: "Bearer your-token",
    "Content-Type": "application/json",
  },
});

module.exports = instance;
