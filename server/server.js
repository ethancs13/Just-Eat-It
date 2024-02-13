import("node-fetch")
  .then(async (module) => {
    const fetch = module.default; // Get the default export of node-fetch

    const express = require("express");
    require("dotenv").config();
    const cors = require("cors");
    const { ApolloServer } = require("@apollo/server");
    const { expressMiddleware } = require("@apollo/server/express4");

    var bcrypt = require("bcryptjs");
    var salt = 10;
    const path = require("path");

    const { authMiddleware } = require("./utils/auth");

    const { typeDefs, resolvers } = require("./schemas");
    const db = require("./config/connection");

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(cors());

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const startApolloServer = async () => {
      await server.start();

      app.use(express.urlencoded({ extended: false }));
      app.use(express.json());

      app.use(
        "/graphql",
        expressMiddleware(server, {
          context: authMiddleware,
        })
      );

      app.get("/", async (req, res) => {
        const { location, cuisine } = req.query;

        try {
          const response = await fetch(
            `https://api.yelp.com/v3/businesses/search?location=${location}&term=${cuisine}&limit=12`,
            {
              headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            res.json(data);
          } else {
            console.error("Failed to fetch data:", response.statusText);
            res.status(500).json({ error: "Failed to fetch data" });
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
          res.status(500).json({ error: error.message });
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
        });
      });
    };

    startApolloServer();
  })
  .catch((error) => {
    console.error("Error importing node-fetch:", error);
  });
