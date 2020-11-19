import { getCurrentUser, login } from "../utils/APIInteraction";

import React from "react";
import { Redirect } from "react-router-dom";
import { getCookie } from "../utils/CookieInteraction";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
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
    if (user !== null || Object.keys(user).length !== 0)
      return <Redirect to="/account" />;
    if (getCookie("token") === "") getCurrentUser().then(setUser);
  }, [user]);

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
      <PageError>Oeps, er is iets mis gegaan bij ons!</PageError>
      {success === "server error" && (
        <PageError>Oeps, er is iets mis gegaan bij ons!</PageError>
      )}
      <OuterFormWrapper>
        Example login pagina
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
      </OuterFormWrapper>
    </PageWrapper>
  );
}

export default LoginPage;
