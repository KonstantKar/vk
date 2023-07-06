import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Components/layout/Layout";
import Home from "./Components/pages/home/Home";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/routes/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
