import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQuery";
import theme from "src/theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";

const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
