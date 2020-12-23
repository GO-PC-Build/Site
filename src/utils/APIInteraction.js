import { getCookie, setCookie } from "./CookieInteraction";

import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/go-pc-build/"
    : "https://api.xiler.net/go-pc-build/";

const login = async (name, password) => {
  try {
    const res = await axios.post(
      "user/login",
      {
        name,
        password,
      },
      {
        headers: {
          "auth-token": getCookie("token"),
          "Content-Type": "application/json",
        },
      }
    );
    setCookie("token", res.data, 14);
    return "logged in";
  } catch (err) {
    if (err.response.status === 400) return "invalid credentials";
    else return "server error";
  }
};

const getCurrentUser = async () => {
  try {
    const res = await axios.get("@me", {
      headers: {
        "auth-token": getCookie("token"),
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("user", res.data.name);
    localStorage.setItem("avatar", res.data.avatar);
    return res.data;
  } catch (e) {
    return null;
  }
};

export { login, getCurrentUser };
