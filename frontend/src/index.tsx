import { ApolloProvider } from "react-apollo";
import App from "./Components/App";
import client from "./apollo";
import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./global-styles";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
