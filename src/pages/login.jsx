import { Link, Redirect } from "react-router-dom";
import { getCurrentUser, login } from "../utils/APIInteraction";

import React from "react";
import { getCookie } from "../utils/CookieInteraction";
import { std } from "../theme/theme";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const discordLoginURI =
  process.env.NODE_ENV !== "production"
    ? "http%3A%2F%2Flocalhost%3A3000%2Fverify"
    : "http%3A%2F%2Feco.xiler.net%2Fverify";

const discordLogin = `https://discord.com/api/oauth2/authorize?client_id=772402639181840385&redirect_uri=${discordLoginURI}&response_type=code&scope=email%20identify`;

const FormWrapper = styled.form`
  display: grid;
  grid-gap: 5px;
`;

const OuterFormWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PageError = styled.h3`
  width: calc(100% - 20px);
  color: #fff;
  background-color: #ff0000;
  border-radius: 5px;
  padding: 10px;
`;

const PageHeader = styled.h1`
  text-align: center;
`;

const CreateAccount = styled(Link)``;

const OtherPlatformsWrapper = styled.div`
  position: relative;
  text-align: center;
  margin: 25px 0;

  span {
    background-color: white;
    padding: 0 5px;
  }

  &::before {
    position: absolute;
    content: "";
    height: 1px;
    background-color: black;
    opacity: 0.75;
    width: 100%;
    top: 50%;
    left: 0;
    z-index: -1;
  }
`;

const LoginWithPlatform = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${(props) => props.font};
  background-color: ${(props) => props.back};
  width: calc(100% - 10px);
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 17.5px;
  height: 30px;
  transition: background-color 0.128s ease-in-out;

  &:hover {
    background-color: ${std.discordDark};
  }

`;

const LoginWithPlatformIcon = styled.img`
  max-height: 30px;
  padding: 0 15px 0 5px;
`;

function LoginPage() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = React.useState("");
  const [user, setUser] = React.useState({});
  const onSubmit = (data) => {
    login(data.name, data.password).then((success) => {
      setSuccess(success);
      if (success === "logged in") window.location.href = "/";
    });
  };

  React.useEffect(() => {
    if (getCookie("token") === "") getCurrentUser().then(setUser);
  }, [user]);

  if (user !== null && Object.keys(user).length !== 0)
    return <Redirect to="/account" />;

  if (success === "logged in")
    return (
      <PageError>
        Oeps, wij konden jou niet doorversturen naar de home pagina.
        <br />
        Herlaad u pagina om in te loggen!
      </PageError>
    );

  return (
    <PageWrapper>
      {success === "server error" && (
        <PageError>Oeps, er is iets mis gegaan bij ons!</PageError>
      )}
      <OuterFormWrapper>
        <PageHeader>Aanmelden</PageHeader>
        {success === "invalid credentials" && (
          <h3>Gebruikersnaam of wachtwoord is incorrect.</h3>
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {watch("name") && <label htmlFor="name">Gebruikersnaam:</label>}
          {errors.name && <span>Gelieve dit veld in te vullen!</span>}
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="username"
            placeholder="Jouw gebruikersnaam of mail adress"
            ref={register({ required: true })}
          />
          {watch("password") && <label htmlFor="name">Wachtwoord:</label>}
          {errors.password && <span>Gelieve dit veld in te vullen!</span>}
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            placeholder="Jouw wachtwoord"
            ref={register({ required: true })}
          />

          <input type="submit" />
        </FormWrapper>
        <CreateAccount to="./register">maak een account aan</CreateAccount>
        <OtherPlatformsWrapper>
          <span>of</span>
        </OtherPlatformsWrapper>
        <LoginWithPlatform
          font={std.tint}
          back={std.discord}
          href={discordLogin}
        >
          <LoginWithPlatformIcon
            src="https://discord.com/assets/5c5bb53489a0a9f602df0a24c5981523.svg"
            alt="discord"
          />
          Meld je aan via discord
        </LoginWithPlatform>
      </OuterFormWrapper>
    </PageWrapper>
  );
}

export default LoginPage;
