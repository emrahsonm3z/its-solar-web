import { ApolloClient } from "apollo-client";
// import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { from } from "apollo-link";
// import { SubscriptionClient } from "subscriptions-transport-ws";
// import { WebSocketLink } from "apollo-link-ws";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

import { APP_HTTP_URI, NODE_ENV } from "config/env";

const httpLink = createHttpLink({ uri: APP_HTTP_URI });
// region get user token from localStorage
let token; // cached token to access localStorage just once
async function getUserToken() {
  if (token) {
    return token;
  }

  return new Promise((resolve, reject) => {
    const storedToken = window.localStorage.getItem("solar_token");
    resolve(storedToken);
  });
}

// const middlewareLink = new ApolloLink((operation, forward) => {
//   operation.setContext(async (operation, { headers }) => {
//     const currentUsertoken = await getUserToken();
//     return currentUsertoken
//       ? { headers: { ...headers, Authorization: `Bearer ${token}` } }
//       : { headers: { ...headers } };
//   });
//   return forward(operation);
// });

const authLink = setContext(async (operation, { headers }) => {
  const currentUsertoken = await getUserToken();
  return currentUsertoken
    ? { headers: { ...headers, Authorization: `Bearer ${token}` } }
    : { headers: { ...headers } };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);

    if (networkError && networkError.statusCode === 401) {
      // redirect to home
      return global.window.location.replace("/");
    }

    // example: add code to a specific operation
    // if (operation.operationName === "getCurrentUser") {
    //   console.log("just getting current user (getCurrentUser query)");
    // }
  }
);

// const wsLink = new WebSocketLink(
//   new SubscriptionClient(APP_SUBSCRIPTION_URI, {
//     reconnect: true
//   })
// );

// const hasSubscriptionOperation = ({ query: { definitions } }) => {
//   return definitions.some(
//     ({ kind, operation }) =>
//       kind === "OperationDefinition" && operation === "subscription"
//   );
// };

// // const link = ApolloLink.split(
// //   /*hasSubscriptionOperation, wsLink,*/
// //   authLink,
// //   errorLink,
// //   httpLink
// // );

// const wsClient = new SubscriptionClient(APP_SUBSCRIPTION_URI, {
//   reconnect: true,
//   connectionParams: {
//     authorization: localStorage.getItem("solar_token")
//       ? `Bearer ${localStorage.getItem("solar_token")}`
//       : ""
//   }
// });

// const wsLink = new WebSocketLink(wsClient);
// const terminatingLink = split(hasSubscriptionOperation, wsLink, httpLink);

const link = from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: NODE_ENV !== "production",
  queryDeduplication: true
});

export default client;
