import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { normalize } from "react-style-reset/string";
import styled, { createGlobalStyle, keyframes } from "styled-components";
// General site layout component
import Layout from "./components/Layout";
import { std } from "./theme/theme";
import {Helmet} from "react-helmet";

// Page components
const HomePage = lazy(() => import("./pages/index"));

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
  background: linear-gradient(90deg, ${std.lightup}0f 0%, ${std.lightup}80 40%, ${std.lightup} 100%);
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
        /></Helmet>
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
          <Route exact path="/loading" component={Loading} />
          <Route exact path="/index" render={() => <Redirect to="/" />} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
