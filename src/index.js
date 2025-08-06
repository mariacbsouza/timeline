import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import "./global.css";
import { Header } from "./components/Header.jsx";
import { Timeline } from "./components/Timeline.jsx";

function App() {
  return (
    <>
      <Header />
      <Timeline />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
