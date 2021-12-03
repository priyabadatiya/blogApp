import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";

import App from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);