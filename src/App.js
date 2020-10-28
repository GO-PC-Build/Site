import React, { Suspense, lazy } from "react";

import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

// General site layout component
import Layout from "./components/Layout";

// Page components
import HomePage from "./pages/index";

function App() {
  return (
    <Router>
      <Suspense fallback={<p>loading</p>}>
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
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;