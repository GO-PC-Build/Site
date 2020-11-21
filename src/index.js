import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { getCookie } from "./utils/CookieInteraction";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/go-pc-build/api/"
    : "https://api.xiler.net/go-pc-build/api/";

axios.defaults.headers.common["auth-token"] = getCookie("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.render(<App />, document.getElementById("root"));
