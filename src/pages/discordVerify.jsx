import { Loading } from "../App";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const discordLoginURI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/verify"
    : "http://eco.xiler.net/verify";

const getAccessToken = async (code) => {
  return await axios.post(
    "https://discord.com/api/oauth2/token",
    qs.stringify({
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: discordLoginURI,
      scope: "identify email",
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

const getUser = async (token) => {
  return await axios
    .get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .catch((err) => console.log(err.response));
};

function DiscordVerify() {
  const code = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).code;

  if (typeof code === "undefined") return <Redirect to="/login" />;

  getAccessToken(code).then((data) => {
    getUser(data.data.access_token)
      .then((res) => console.log(res))
      .catch((res) => res.response);
  });

  

  return <Loading />;
}

export default DiscordVerify;
