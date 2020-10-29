import React, { Suspense, lazy } from "react";

import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import styled from "styled-components";

import { std } from "./theme/theme";

// General site layout component
import Layout from "./components/Layout";

// Page components
const HomePage = lazy(() => import("./pages/index"));

const LoaderWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: ${std.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => <LoaderWrapper>Loading page, please wait.</LoaderWrapper>;

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Layout title="Home">
                <HomePage />
              </Layout>
            )}
          />
          <Route
            exact
            path="/404"
            render={() => (
              <Layout title="404 - page not found">
                <p>Oops no foundie sorry</p>
              </Layout>
            )}
          />
          <Route exact path="/index" render={() => <Redirect to="/" />} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
