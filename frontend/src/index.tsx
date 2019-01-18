import { ApolloProvider } from "react-apollo";
import App from "./Components/App";
import client from "./apollo";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
