const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

var bcrypt = require('bcryptjs'); // require bcrypt
var salt = 10;
const path = require('path');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Important for MERN Setup: Any client-side requests that begin with '/graphql' will be handled by our Apollo Server
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));






  // signup routes
  app.post('/signup', (req, res) => {

    // store email and password
    const username = req.body.username;
    const password = req.body.password;

    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const option3 = req.body.option3;
    const option4 = req.body.option4;

    // hash password
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.json({ Error: "Error when hashing password" + err })
      }
      // query values
      const values = [
        username,
        hash,
        option1,
        option2,
        option3,
        option4,
      ];

      console.log("values: ", values)

      res.json({ Status: "Success" });
    })
  })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
