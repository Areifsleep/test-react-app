import React from "react";
import App from "./App";
//import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
//import "./App.css";

// const container = document.getElementById("root");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
