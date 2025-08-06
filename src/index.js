import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import "./global.css";
import { Header } from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
