const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const seedDatabase = require("./seeders/seed");

var bcrypt = require("bcryptjs");
var salt = 10;
const path = require("path");

// web socket!
// const { WebSocket, WebSocketServer } = require('ws');
// const WS_PORT = 8080
// const wss = new WebSocketServer({ port: WS_PORT })
// wss.on('listening', () => {
//   console.log(`WebSocketServer listening on port ${WS_PORT}`)
// })

// wss.on('connection', function (ws) {
//   ws.on('error', () => console.error(error))

//   ws.on('message', function (data) {
//     let jsonData = JSON.parse(data);
//     console.log(jsonData)
//     if (jsonData.name) {
//       console.log(`${jsonData.name} has connected.`);
//       ws.name = jsonData.name
//       wss.clients.forEach(function (client) {
//         if (client.readyState === WebSocket.OPEN && ws.name !== client.name) {
//           console.log(ws.name)
//           client.send(JSON.stringify({ announcement: `${ws.name} has joined.` }))
//         }
//       })
//     } else {
//       wss.clients.forEach(function (client) {
//         if (client.readyState === WebSocket.OPEN && ws.name !== client.name) {
//           client.send(JSON.stringify({ name: ws.name, message: jsonData.message }))
//         }
//       })
//     }
//   })

//   ws.on('close', function () {
//     console.log(`${ws.name} has left.`)
//     wss.clients.forEach(function (client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ announcement: `${ws.name} has left.` }))
//       }
//     })
//   })
// })

const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// expressWs(app)
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://just-eat-it-be3958285291.herokuapp.com/",
      "http://just-eat-it-be3958285291.herokuapp.com/",
    ],
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Add seeding logic here
  if (process.env.SEED_DB === "true") {
    await seedDatabase();
    console.log("Database seeded successfully!");
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.get("/", (req, res) => {
    if (process.env.NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    }
  });

  app.get("/api/search", async (req, res) => {
    const { location, cuisine } = req.query;

    if (!location) {
      res.status(400).json({ error: "A location is required." });
      return;
    }

    try {
      const response = await axios.get(
        "https://api.yelp.com/v3/businesses/search",
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          params: {
            location: location,
            term: cuisine,
            limit: 12,
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
      res.status(500).json({
        error,
      });
    }
  });

  app.get("/api/key", async (req, res) => {
    const key = await process.env.GOOGLE_PLACES_API;
    res.json({ key });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at https://just-eat-it.onrender.com/graphql`);
    });
  });
};

startApolloServer();
