import React from "react";

import { normalize } from "react-style-reset/string";
import styled, { createGlobalStyle } from "styled-components";

import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

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

const ContentWrapper = styled.main`
  width: 1000px;
  max-width: 80%;
  margin: 5px auto;
`;

const OuterContentWrapper = styled.div``;

function Layout({ title, children }) {
  return (
    <React.Fragment>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <title>GO-PC Build | {title}</title>
      </Helmet>
      <GlobalStyles />
      <OuterContentWrapper>
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
      </OuterContentWrapper>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
