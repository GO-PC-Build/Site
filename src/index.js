import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { checkEnvVariables } from "./utils/checkEnvVariables";
import { getCookie } from "./utils/CookieInteraction";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_BACKEND_URL_DEV
    : process.env.REACT_APP_BACKEND_URL;

axios.defaults.headers.common["auth-token"] = getCookie("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

checkEnvVariables(["REACT_APP_BACKEND_URL", "REACT_APP_BACKEND_URL_DEV"]);

ReactDOM.render(<App />, document.getElementById("root"));
