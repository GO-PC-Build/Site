import React, { Suspense, lazy } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

import { Helmet } from "react-helmet";
import Layout from "./components/Layout";
import { normalize } from "react-style-reset/string";
import { std } from "./theme/theme";

// Page components
const HomePage = lazy(() => import("./pages/index"));
const LoginPage = lazy(() => import("./pages/login"));

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }

  ${normalize};

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const LoaderWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: ${std.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoaderText = styled.p`
  color: ${std.lightup};
`;

const LoaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  position: relative;
  background: ${std.lightup};
  background: linear-gradient(
    90deg,
    ${std.lightup}0f 0%,
    ${std.lightup}80 40%,
    ${std.lightup} 100%
  );
  width: 25px;
  height: 25px;
  border-radius: 50%;
  animation: 1s ${LoaderAnimation} infinite linear;

  &::after {
    position: absolute;
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    bottom: -8px;
    left: -1px;
    background-color: ${std.main};
  }
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotCount: 0,
      goingUp: true,
    };
  }

  componentDidMount() {
    const getState = () => {
      if (this.state.dotCount < 3 && this.state.goingUp)
        return { dotCount: this.state.dotCount + 1 };
      if (this.state.dotCount === 0)
        return { dotCount: this.state.dotCount + 1, goingUp: true };
      if (this.state.dotCount >= 3 || !this.state.goingUp)
        return { dotCount: this.state.dotCount - 1, goingUp: false };
    };

    this.interval = setInterval(() => this.setState(getState()), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = "";
    for (let i = 0; i < this.state.dotCount; i++) dots += ".";
    return (
      <LoaderWrapper>
        <Loader />
        <LoaderText>Laden{dots}</LoaderText>
      </LoaderWrapper>
    );
  }
}

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Helmet>
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
            path="/login"
            render={() => (
              <Layout title="Aanmelden of Registreren">
                <LoginPage />
              </Layout>
            )}
          />
          <Route exact path="/loading" component={Loading} />
          <Route exact path="/logout" render={() => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/";
          }} />
          <Route exact path="/index" render={() => <Redirect to="/" />} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
