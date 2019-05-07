import React from "react";
import { Bot } from "./Components/Bot";

const App = () => {
  return (
    <div className="App">
      <div className="dashboard">
        <nav className="nav">
          <h2 className="nav__title">Web</h2>
        </nav>
        <main>
          <Bot />
        </main>
      </div>
    </div>
  );
};

export { App };
