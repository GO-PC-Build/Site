import React, { Suspense } from "react";
import styled from "styled-components";
import icon from "../assets/Icon.png";
import { std } from "../theme/theme";

// const icon = lazy(() => import("../assets/Icon.png"));

const headerConfig = {
  height: 80,
  hrefs: [
    ["./index", "Home"],
    ["./about", "Over Ons"],
    ["./quizz", "Quizz"],
    ["./login", "Aanmelden/Registreren"],
  ],
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: ${headerConfig.height}px;

  background-color: ${std.main};

  display: flex;
  justify-content: center;
`;

const InnerHeaderWrapper = styled.div`
  width: 900px;
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderIcon = styled.img`
  width: ${headerConfig.height - 10}px;
  height: ${headerConfig.height - 10}px;
`;

const HeaderIconFallback = styled.div`
  width: ${headerConfig.height - 10}px;
  height: ${headerConfig.height - 10}px;
`;

const HeaderNavigationWrapper = styled.nav`
  height: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(${headerConfig.hrefs.length}, auto);
`;

const HeaderNavigationItem = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${std.tint};
  padding: 0 10px;
  transition: background-color 0.128s ease-in-out;

  &:hover {
    background-color: ${std.lightup + "50"};
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <InnerHeaderWrapper>
        <Suspense fallback={<HeaderIconFallback />}>
          <HeaderIcon src={icon} alt="GO-AO Image" />
        </Suspense>
        <HeaderNavigationWrapper>
          {headerConfig.hrefs.map((item) => (
            <HeaderNavigationItem href={item[0]}>
              {item[1]}
            </HeaderNavigationItem>
          ))}
        </HeaderNavigationWrapper>
      </InnerHeaderWrapper>
    </HeaderWrapper>
  );
}

export default Header;
