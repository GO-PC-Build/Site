import axios from "axios";
import { setCookie } from "./CookieInteraction";

const login = async (name, password) => {
  try {
    const res = await axios.post("user/login", {
      name,
      password,
    });
    setCookie("token", res.data, 14);
    localStorage.setItem("user", res.data.name);
    localStorage.setItem("avatar", res.data.avatar);
    return "logged in";
  } catch (err) {
    if (err.response.status === 400) return "invalid credentials";
    else return "server error";
  }
};

const getCurrentUser = async () => {
  console.log(`API ROOT: ${axios.defaults.baseURL}`);
  try {
    const res = await axios.get("@me");
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { login, getCurrentUser };
