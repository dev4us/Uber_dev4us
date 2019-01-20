import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQuery";
import theme from "src/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";

const AppContainer = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </React.Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
