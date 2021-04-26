import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import App from "./components/App";
import client from "./apollo";

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
