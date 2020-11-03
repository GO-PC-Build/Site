import React from "react";

import styled from "styled-components";

import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

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
        <title>GO-PC Build | {title}</title>
      </Helmet>
      <OuterContentWrapper>
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
      </OuterContentWrapper>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
