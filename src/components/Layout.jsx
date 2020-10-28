import React from "react";

import Header from "./Header";

import { normalize } from "react-style-reset/string";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${normalize};
`;

function Layout({ title, children }) {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Header />
      <main>
        GO-PC Build - {title} <br /> {children}
      </main>
    </React.Fragment>
  );
}

export default Layout;
