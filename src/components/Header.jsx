import React, { Suspense, lazy } from "react";

import styled from "styled-components";

import { std } from "../theme/theme";

import icon from "../assets/Icon.png";

// const icon = lazy(() => import("../assets/Icon.png"));

const headerConfig = {
  height: 80,
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: ${headerConfig.height}px;

  background-color: ${std.main};
`;

const HeaderIcon = styled.img`
  width: ${headerConfig.height - 10}px;
  height: ${headerConfig.height - 10}px;
`;

const HeaderIconFallback = styled.div`
  width: ${headerConfig.height - 10}px;
  height: ${headerConfig.height - 10}px;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Suspense fallback={<HeaderIconFallback />}>
        <HeaderIcon src={icon} alt="GO-AO Image" />
      </Suspense>
    </HeaderWrapper>
  );
}

export default Header;
