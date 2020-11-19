import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { checkEnvVariables } from "./utils/checkEnvVariables";
import { getCookie } from "./utils/CookieInteraction";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/go-pc-build/api/"
    : "https://api.xiler.net/go-pc-build/api/";

axios.defaults.headers.common["auth-token"] = getCookie("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

checkEnvVariables(["REACT_APP_BACKEND_URL", "REACT_APP_BACKEND_URL_DEV"]);

ReactDOM.render(<App />, document.getElementById("root"));
