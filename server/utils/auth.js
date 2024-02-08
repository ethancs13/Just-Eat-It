const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const secret = process.env.MY_SECRET;
const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError(
    "We ran into a problem.  Could not authenticate user.",
    {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    }
  ),

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.error("Invalid token:", error.message);
    }

    return req;
  },

  signToken: function ({ username, _id }) {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
