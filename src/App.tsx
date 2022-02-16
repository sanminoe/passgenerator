import React, { useEffect } from "react";
import Generator from "./Pages/Generator";

import "./App.css";
function App() {
  return (
    <div className="App">
      <header className="flex justify-between text-white">
        <article>
          <h1>Logo</h1>
        </article>
      </header>
      <div className="flex justify-center">
        <Generator />
      </div>
    </div>
  );
}

export default App;
