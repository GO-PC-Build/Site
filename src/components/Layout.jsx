import React from "react";

import Header from "./Header";

import { normalize } from "react-style-reset/string";
import styled, { createGlobalStyle } from "styled-components";

import { Helmet } from "react-helmet";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }

  ${normalize};
`;

const ContentWrapper = styled.main`
  width: 900px;
  max-width: 80%;
  margin: 5px auto;
`

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
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </React.Fragment>
  );
}

export default Layout;
