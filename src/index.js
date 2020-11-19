import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { checkEnvVariables } from "./utils/checkEnvVariables";

checkEnvVariables(["REACT_APP_BACKEND_URL", "REACT_APP_BACKEND_URL_DEV"]);

ReactDOM.render(<App />, document.getElementById("root"));
