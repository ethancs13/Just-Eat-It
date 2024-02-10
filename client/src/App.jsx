import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          favorites: {
            merge(existing = [], incoming) {
              // Custom merge function for the favorite places
              const merged = [...existing];

              incoming.forEach((item) => {
                if (
                  !existing.some(
                    (existingItem) =>
                      existingItem.businessId === item.businessId
                  )
                ) {
                  merged.push(item);
                }
              });

              return merged;
            },
          },
          friends: {
            merge(existing = [], incoming) {
              // Custom merge function for the friends
              const merged = [...existing];

              incoming.forEach((item) => {
                if (
                  !existing.some(
                    (existingItem) => existingItem._id === item._id
                  )
                ) {
                  merged.push(item);
                }
              });

              return merged;
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
