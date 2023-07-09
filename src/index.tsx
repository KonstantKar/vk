import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/routes/Routes";
import * as firebase from "firebase/app";
import AuthProvider from "./Components/providers/AuthProvider";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC9RUfEeXayu3tPAV71_GKpu0vUCAuJtv4",
  authDomain: "vk-copy-e9f96.firebaseapp.com",
  projectId: "vk-copy-e9f96",
  storageBucket: "vk-copy-e9f96.appspot.com",
  messagingSenderId: "795108094133",
  appId: "1:795108094133:web:b1b7469f78e9a2779e0efc",
  measurementId: "G-3HDX5YQVQQ",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
