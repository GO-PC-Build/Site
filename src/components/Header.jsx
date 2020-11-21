import React, { Suspense } from "react";
import styled, { keyframes } from "styled-components";

import { Link } from "react-router-dom";
import { getCookie } from "../utils/CookieInteraction";
import { getCurrentUser } from "../utils/APIInteraction";
import icon from "../assets/Icon.png";
import { std } from "../theme/theme";

// const icon = lazy(() => import("../assets/Icon.png"));

const headerConfig = {
  height: 80,
  hrefs: [
    ["./index", "Home"],
    ["./about", "Over Ons"],
    ["./quizz", "Quizz"],
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
  width: 1000px;
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoadingAnimation = keyframes`
  0% { background-color: hsl(360, 0%, 50%); }
  66.66% { background-color: hsl(360, 0%, 60%); }
  100% { background-color: hsl(360, 0%, 50%); }
`;

const HeaderIconFallback = styled.div`
  border-radius: 3px;
  width: ${headerConfig.height - 10}px;
  height: ${headerConfig.height - 10}px;
  background-color: hsl(360, 0%, 50%);
  animation: 1s ${LoadingAnimation} infinite ease-in-out;
`;

const HeaderIcon = styled.img`
  width: ${headerConfig.height - 10}px;
  height: ${headerConfig.height - 10}px;
`;

const HeaderNavigationWrapper = styled.nav`
  position: relative;
  height: ${headerConfig.height}px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(${headerConfig.hrefs.length + 1}, auto);
`;

const HeaderNavigationItem = styled(Link)`
  position: relative;
  height: ${headerConfig.height}px;
  background-color: ${std.main};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${std.tint};
  padding: 0 10px;
  transition: background-color 0.128s ease-in-out;
  text-align: center;
  z-index: 2;

  &:hover {
    background-color: ${std.darkLightup};
  }
`;

const AvatarWrapper = styled.img`
  border-radius: 50%;
  height: 50%;
  max-width: 40px;
  margin: 0 10px 0 0;
`;

const OutterAccountWrapper = styled.div`
  position: relative;

  &:hover div {
    top: ${headerConfig.height}px;
  }
`;

const AccountWrapper = styled.div`
  background-color: ${std.main};
  left: 0;
  width: 100%;
  position: absolute;
  top: -${headerConfig.height}px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
  transition: top 0.25s ease-in-out;

  a:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
`;

function Header() {
  const [user, setUser] = React.useState({});
  if ((user === null || Object.keys(user).length === 0) && getCookie("token"))
    getCurrentUser().then(setUser);

  const localUser =
    localStorage !== null
      ? typeof localStorage.user !== "undefined"
        ? localStorage.user
        : false
      : false;

  return (
    <HeaderWrapper>
      <InnerHeaderWrapper>
        <Suspense fallback={<HeaderIconFallback />}>
          <HeaderIcon src={icon} alt="GO-AO Image" />
        </Suspense>
        <HeaderNavigationWrapper>
          {headerConfig.hrefs.map((item) => (
            <HeaderNavigationItem key={item} to={item[0]}>
              {item[1]}
            </HeaderNavigationItem>
          ))}
          {getCookie("token") === "" ? (
            <HeaderNavigationItem to="./login">
              Aanmelden/Registreren
            </HeaderNavigationItem>
          ) : (
            <OutterAccountWrapper>
              <HeaderNavigationItem
                to={user || localUser ? "./account" : "/login"}
              >
                {(user || localUser) && (
                  <AvatarWrapper
                    src={
                      user.avatar ||
                      (localStorage !== null
                        ? typeof localStorage.avatar !== "undefined"
                          ? localStorage.avatar
                          : false
                        : false) ||
                      "/images/defaultProfilePicture.png"
                    }
                  />
                )}
                {user !== null || localUser
                  ? user.name || localUser
                  : "Aanmelden/Registreren"}
              </HeaderNavigationItem>
              {(user || localUser) && (
                <AccountWrapper>
                  <HeaderNavigationItem to="./account">
                    Mijn account
                  </HeaderNavigationItem>
                  <HeaderNavigationItem to="./logout">
                    Afmelden
                  </HeaderNavigationItem>
                </AccountWrapper>
              )}
            </OutterAccountWrapper>
          )}
        </HeaderNavigationWrapper>
      </InnerHeaderWrapper>
    </HeaderWrapper>
  );
}

export default Header;
